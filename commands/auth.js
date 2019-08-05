const chalk = require('chalk')
const prompt = require('prompt')
const Promise = require('bluebird')

module.exports = () => {
  const schema = {
    properties: {
      username: {
        type: 'string',
        description: 'Username',
        message: '',
        required: true
      },
      password: {
        type: 'string',
        description: 'Password',
        hidden: true,
        replace: '*',
        required: true
      }
    }
  }

  prompt.get = Promise.promisify(prompt.get)
  prompt.message = ''
  prompt.delimiter = ':'

  console.log(`\n${chalk.bold('Generate HTTP Basic Authentication Token')}`.concat(`${chalk.grey(' [Ctrl-C to Cancel]')}\n`))

  prompt.start()

  prompt.get(schema).then(result => {
    const credentials = `${result.username}:${result.password}`
    const token = new Buffer(credentials).toString('base64')

    console.log(`${chalk.bold.green('⚑')} ${chalk.bold('Token Generated:')} ${chalk.cyan(token)}\n`)
    console.log(`Sample Usage: ${chalk.dim.grey('/path/to/my/config.json')}\n`)
    console.log(JSON.stringify({
        format: 'md',
        notices: false,
        warnings: false,
        output: '/path/to/my/report',
        tests: [
          {
            url: 'https://mywebsite.com',
            auth: {
              token: token
            }
          }
        ]
      }, null, 2)
    )

    console.log('\n')
  })
  .catch(() => {
    console.log(`\n\n${chalk.red('✖ Cancelled')}\n`)
  })
}
