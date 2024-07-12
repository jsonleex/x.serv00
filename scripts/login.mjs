import process from 'node:process'
import puppeteer from 'puppeteer'

/**
 * Set environment variables on GitHub Actions.
 * - SERV00_URL
 * - SERV00_USERNAME
 * - SERV00_PASSWORD
 * @link https://github.com/jsonleex/x.serv00/settings/secrets/actions
 */
const { SERV00_PASSWORD, SERV00_USERNAME, SERV00_URL } = process.env

if (!SERV00_URL || !SERV00_USERNAME || !SERV00_PASSWORD) {
  console.log('❌ Missing environment variables.')
  process.exit(1)
}

try {
  await login(SERV00_URL, SERV00_USERNAME, SERV00_PASSWORD)
}
catch (error) {
  console.error(String(error))
  process.exit(1)
}

async function login(url, username, password) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    console.log(`⏳ ${username} - login to ${url}`)
    await page.goto(url)

    const $submit = await page.$('#submit')
    const $username = await page.$('#id_username')
    const $password = await page.$('#id_password')

    if ($username) {
      // retype username
      await $username.click({ clickCount: 3 })
      await $username.press('Backspace')
      await $username.type(username)
    }

    if ($password) {
      // retype password
      await $password.click({ clickCount: 3 })
      await $password.press('Backspace')
      await $password.type(password)
    }

    if ($submit) {
      await $submit.click()
    }
    else {
      throw new Error(`❌ ${username} - submit button not found.`)
    }

    await page.waitForNavigation()

    if (await page.evaluate(() => Boolean(document.querySelector('a[href="/logout/"]')))) {
      console.log(`⭕️ ${username} - login success.`)
    }
    else {
      throw new Error(`❌ ${username} - login failed.`)
    }
  }
  finally {
    await page.close()
    await browser.close()
  }
}
