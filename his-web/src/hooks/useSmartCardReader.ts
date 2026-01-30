// src/hooks/useSmartCardReader.ts

import { useState, useEffect, useCallback, useRef } from 'react';

// Types for Smart Card data (Go server format)
export interface SmartCardData {
  cid: string;
  cid_formatted: string;
  name_th: {
    prefix: string;
    firstname: string;
    lastname: string;
  };
  name_en: {
    prefix: string;
    firstname: string;
    lastname: string;
  };
  dob: string;
  gender: string;
  gender_desc: string;
  address: string;
  issue_date: string;
  expire_date: string;
  photo?: string;
  read_time_ms?: number;
}

// Go server message types
interface ServerMessage {
  type: 'connected' | 'card_inserted' | 'card_removed' | 'error';
  payload: {
    data?: SmartCardData;
    success?: boolean;
    config?: {
      auto_read: boolean;
      auto_read_interval: number;
      include_photo: boolean;
    };
    status?: string;
    reader?: string;
    message?: string;
  };
}

export interface SmartCardReaderState {
  isConnected: boolean;
  isReading: boolean;
  cardData: SmartCardData | null;
  error: string | null;
  readerStatus: 'disconnected' | 'connecting' | 'connected' | 'card_inserted' | 'reading' | 'success' | 'error';
  readerName: string | null;
}

interface UseSmartCardReaderOptions {
  serverUrl?: string;
  autoConnect?: boolean;
  onCardRead?: (data: SmartCardData) => void;
  onError?: (error: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function useSmartCardReader(options: UseSmartCardReaderOptions = {}) {
  const {
    serverUrl = 'http://localhost:8080',
    autoConnect = false,
  } = options;

  // Convert http(s) to ws(s)
  const wsUrl = serverUrl.replace(/^http/, 'ws') + '/ws';

  // Use refs for callbacks to avoid dependency issues
  const onCardReadRef = useRef(options.onCardRead);
  const onErrorRef = useRef(options.onError);
  const onConnectRef = useRef(options.onConnect);
  const onDisconnectRef = useRef(options.onDisconnect);

  // Update refs when callbacks change
  useEffect(() => {
    onCardReadRef.current = options.onCardRead;
    onErrorRef.current = options.onError;
    onConnectRef.current = options.onConnect;
    onDisconnectRef.current = options.onDisconnect;
  }, [options.onCardRead, options.onError, options.onConnect, options.onDisconnect]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const [state, setState] = useState<SmartCardReaderState>({
    isConnected: false,
    isReading: false,
    cardData: null,
    error: null,
    readerStatus: 'disconnected',
    readerName: null,
  });

  // Handle incoming messages from Go server
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message: ServerMessage = JSON.parse(event.data);
      console.log('WebSocket message received:', message);

      switch (message.type) {
        case 'connected':
          console.log('Server connected, config:', message.payload.config);
          setState(prev => ({
            ...prev,
            isConnected: true,
            error: null,
            readerStatus: 'connected',
          }));
          onConnectRef.current?.();
          break;

        case 'card_inserted':
          if (message.payload.success && message.payload.data) {
            console.log('Card data received:', message.payload.data);
            setState(prev => ({
              ...prev,
              isReading: false,
              cardData: message.payload.data!,
              readerStatus: 'success',
              error: null,
            }));
            onCardReadRef.current?.(message.payload.data);
          } else {
            setState(prev => ({
              ...prev,
              isReading: true,
              readerStatus: 'reading',
              error: null,
            }));
          }
          break;

        case 'card_removed':
          console.log('Card removed from:', message.payload.reader);
          setState(prev => ({
            ...prev,
            readerStatus: prev.isConnected ? 'connected' : 'disconnected',
            cardData: null,
            isReading: false,
            readerName: message.payload.reader || null,
          }));
          break;

        case 'error':
          const errorMsg = message.payload.message || 'เกิดข้อผิดพลาด';
          console.error('Server error:', errorMsg);
          setState(prev => ({
            ...prev,
            isReading: false,
            error: errorMsg,
            readerStatus: 'error',
          }));
          onErrorRef.current?.(errorMsg);
          break;

        default:
          console.log('Unknown message type:', message);
      }
    } catch (err) {
      console.error('Failed to parse message:', err, event.data);
    }
  }, []);

  // Connect to WebSocket server
  const connect = useCallback(() => {
    // Clean up existing connection
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Clear any pending reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    setState(prev => ({ 
      ...prev, 
      error: null, 
      readerStatus: 'connecting' 
    }));

    try {
      console.log('Connecting to WebSocket:', wsUrl);
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        reconnectAttemptsRef.current = 0;
        // Wait for 'connected' message from server to confirm
      };

      ws.onmessage = handleMessage;

      ws.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        wsRef.current = null;
        
        setState(prev => ({
          ...prev,
          isConnected: false,
          isReading: false,
          readerStatus: 'disconnected',
        }));
        
        onDisconnectRef.current?.();

        // Auto reconnect if not intentional close
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000);
          console.log(`Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        const errorMsg = 'ไม่สามารถเชื่อมต่อเครื่องอ่านบัตรได้';
        setState(prev => ({
          ...prev,
          isConnected: false,
          isReading: false,
          error: errorMsg,
          readerStatus: 'error',
        }));
        onErrorRef.current?.(errorMsg);
      };

    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      const errorMsg = 'ไม่สามารถสร้างการเชื่อมต่อได้';
      setState(prev => ({
        ...prev,
        error: errorMsg,
        readerStatus: 'error',
      }));
      onErrorRef.current?.(errorMsg);
    }
  }, [wsUrl, handleMessage]);

  // Disconnect from server
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    reconnectAttemptsRef.current = maxReconnectAttempts; // Prevent auto reconnect
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnect');
      wsRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isConnected: false,
      isReading: false,
      readerStatus: 'disconnected',
    }));
  }, []);

  // Request card read (if server supports manual read request)
  const readCard = useCallback(() => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      const errorMsg = 'ยังไม่ได้เชื่อมต่อเครื่องอ่านบัตร';
      setState(prev => ({ ...prev, error: errorMsg }));
      onErrorRef.current?.(errorMsg);
      return;
    }

    setState(prev => ({
      ...prev,
      isReading: true,
      error: null,
      readerStatus: 'reading',
    }));

    // Send read request to server
    wsRef.current.send(JSON.stringify({ type: 'read_card' }));
  }, []);

  // Clear card data
  const clearCardData = useCallback(() => {
    setState(prev => ({
      ...prev,
      cardData: null,
      error: null,
      readerStatus: prev.isConnected ? 'connected' : 'disconnected',
    }));
  }, []);

  // Reset state
  const resetState = useCallback(() => {
    setState({
      isConnected: false,
      isReading: false,
      cardData: null,
      error: null,
      readerStatus: 'disconnected',
      readerName: null,
    });
  }, []);

  // Auto connect on mount if enabled
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmount');
        wsRef.current = null;
      }
    };
  }, [autoConnect, connect]);

  return {
    ...state,
    connect,
    disconnect,
    readCard,
    clearCardData,
    resetState,
  };
}