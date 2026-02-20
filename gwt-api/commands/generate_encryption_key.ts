// commands/encrypt_health_credentials.ts
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import { SecureConfig } from '../app/utils/crypto.js'

export default class EncryptHealthCredentials extends BaseCommand {
  static commandName = 'encrypt:health-credentials'
  static description = 'Encrypt Health ID and Provider ID credentials'

  static options: CommandOptions = {
    startApp: false,
  }

  async run() {
    const { default: chalk } = await import('chalk')

    this.logger.info('🔐 Health ID Credentials Encryption Tool')
    console.log('')

    // 📝 พิมพ์ค่าตอนรัน
    const healthIdClientId = await this.prompt.ask('Enter HEALTH_ID_CLIENT_ID', {
      validate: (value) => value.length > 0 || 'Required',
    })

    const healthIdClientSecret = await this.prompt.secure('Enter HEALTH_ID_CLIENT_SECRET', {
      validate: (value) => value.length > 0 || 'Required',
    })

    const providerClientId = await this.prompt.ask('Enter PROVIDER_ID_CLIENT_ID', {
      validate: (value) => value.length > 0 || 'Required',
    })

    const providerSecretKey = await this.prompt.secure('Enter PROVIDER_ID_SECRET_KEY', {
      validate: (value) => value.length > 0 || 'Required',
    })

    console.log('')
    this.logger.info('Encrypting credentials...')
    console.log('')

    // Encrypt
    const encrypted = {
      healthIdClientId: SecureConfig.encrypt(healthIdClientId),
      healthIdClientSecret: SecureConfig.encrypt(healthIdClientSecret),
      providerClientId: SecureConfig.encrypt(providerClientId),
      providerSecretKey: SecureConfig.encrypt(providerSecretKey),
    }

    // แสดงผล
    console.log(chalk.bold.green('✅ Encryption Complete!'))
    console.log('')
    console.log(chalk.bold('📋 Copy these to app/services/health_id_service.ts:'))
    console.log(chalk.dim('─'.repeat(80)))
    console.log('')

    console.log(chalk.cyan('this.healthIdClientId = SecureConfig.decrypt('))
    console.log(chalk.green(`  '${encrypted.healthIdClientId}'`))
    console.log(chalk.cyan(')'))
    console.log('')

    console.log(chalk.cyan('this.healthIdClientSecret = SecureConfig.decrypt('))
    console.log(chalk.green(`  '${encrypted.healthIdClientSecret}'`))
    console.log(chalk.cyan(')'))
    console.log('')

    console.log(chalk.cyan('this.providerClientId = SecureConfig.decrypt('))
    console.log(chalk.green(`  '${encrypted.providerClientId}'`))
    console.log(chalk.cyan(')'))
    console.log('')

    console.log(chalk.cyan('this.providerSecretKey = SecureConfig.decrypt('))
    console.log(chalk.green(`  '${encrypted.providerSecretKey}'`))
    console.log(chalk.cyan(')'))
    console.log('')

    console.log(chalk.dim('─'.repeat(80)))
  }
}