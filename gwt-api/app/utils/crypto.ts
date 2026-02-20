
import crypto from 'node:crypto'

export class SecureConfig {

  private static readonly ENCRYPTION_KEY = Buffer.from(
    '8GewYFDwZh8tyhG5GjXzKGBPCWpOqOeChdocOOdAFLs=',
    'base64'
  )

  private static readonly ALGORITHM = 'aes-256-gcm'
  private static readonly IV_LENGTH = 16
  private static readonly ENCODING: BufferEncoding = 'hex'

  static encrypt(text: string): string {
    try {
      const iv = crypto.randomBytes(this.IV_LENGTH)
      const cipher = crypto.createCipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv)

      let encrypted = cipher.update(text, 'utf8', this.ENCODING)
      encrypted += cipher.final(this.ENCODING)

      const authTag = cipher.getAuthTag()

      return [
        iv.toString(this.ENCODING),
        authTag.toString(this.ENCODING),
        encrypted,
      ].join(':')
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`)
    }
  }

  static decrypt(encryptedText: string): string {
    try {
      const parts = encryptedText.split(':')
      if (parts.length !== 3) {
        throw new Error('Invalid encrypted data format')
      }

      const [ivHex, tagHex, encrypted] = parts
      const iv = Buffer.from(ivHex, this.ENCODING)
      const authTag = Buffer.from(tagHex, this.ENCODING)

      const decipher = crypto.createDecipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv)
      decipher.setAuthTag(authTag)

      let decrypted = decipher.update(encrypted, this.ENCODING, 'utf8')
      decrypted += decipher.final('utf8')

      return decrypted
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`)
    }
  }

  static generateKey(): string {
    return crypto.randomBytes(32).toString('base64')
  }

  static validateKey(key: string): boolean {
    try {
      const buffer = Buffer.from(key, 'base64')
      return buffer.length === 32
    } catch {
      return false
    }
  }
}