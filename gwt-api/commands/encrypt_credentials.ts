// commands/encrypt_credentials.ts
import { BaseCommand, args } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { SecureConfig } from '../app/utils/crypto.js'

export default class EncryptCredentials extends BaseCommand {
  static commandName = 'encrypt:credentials'
  static description = 'Encrypt credentials for secure storage in code'

  static options: CommandOptions = {
    startApp: false,
  }

  @args.string({ description: 'Credential value to encrypt' })
  declare value: string

  async run() {
    const { default: chalk } = await import('chalk')

    if (!this.value) {
      // Interactive mode - encrypt all Health ID credentials
      this.logger.info('🔐 Encrypting Health ID Credentials')
      console.log('')

      const credentials = {
        healthIdClientId: '9a818731-c67a-45a8-bd4e-f72979dc1b70',
        healthIdClientSecret: 'qajoa3Qu5j5YdjlTtPcC2q8TbFDWGbJhmFzwqao7',
        providerClientId: '4f85415d-b356-4eb4-aacd-5695a6b9d2bc',
        providerSecretKey: 'jDWetPKKH4aPmCRFhb91GKTyBUDuRwES',
      }

      console.log(chalk.bold('📝 Encrypted Credentials (copy to constructor):'))
      console.log('')

      for (const [key, value] of Object.entries(credentials)) {
        const encrypted = SecureConfig.encrypt(value)
        console.log(chalk.cyan(`${key}:`))
        console.log(chalk.green(`  '${encrypted}'`))
        console.log('')
      }

      console.log(chalk.yellow('⚠️  Keep these encrypted strings secure'))
      console.log(chalk.yellow('⚠️  Delete this command after use'))
    } else {
      // Single value mode
      const encrypted = SecureConfig.encrypt(this.value)
      console.log(chalk.green('Encrypted value:'))
      console.log(encrypted)
    }
  }
}