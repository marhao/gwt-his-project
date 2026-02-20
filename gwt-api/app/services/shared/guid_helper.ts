import { v4 as uuidv4 } from 'uuid'

export default class GuidHelper {
  /**
   * Generate new GUID
   * Equivalent: @Hosxpdmu@GetNewGUID
   */
  public static async getNewGUID(): Promise<string> {
    return uuidv4()
  }
}