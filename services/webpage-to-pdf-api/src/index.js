const pkg = require('../package.json')
const puppeteer = require('puppeteer')
const express = require('express')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const app = express()

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const mkdir = (path, options) => new Promise((resolve, reject) => {

    fs.mkdir(path, options, (err, result) => {

        if (err) {
            reject(err)
            return
        }

        resolve(result)
    })
})

const PORT = process.env.PORT || 3000

app.use(morgan())

app.use('/examples', express.static(__dirname + '/examples'))

app.get('/pdf', async (req, res) => {

    try {

        const url = req.query.url

        const margin = req.query.margin || 40

        const displayHeaderFooter = req.query.displayHeaderFooter ? req.query.displayHeaderFooter === 'true' : false
        const printBackground = req.query.printBackground ? req.query.printBackground === 'true' : false
        const landscape = req.query.landscape ? req.query.landscape === 'true' : false
        const pageRanges = req.query.pageRanges ? req.query.pageRanges : ''
        const format = req.query.format ? req.query.format : 'A4'
        const timeout = req.query.timeout ? Math.min(30000, parseInt(req.query.timeout, 10)) : 0
        const download = req.query.download ? req.query.download === 'true' : false
        const filename = req.query.filename ? req.query.filename : 'download.pdf'

        if (!url) {
            throw new Error('No url provided. Add the url using the ?url query parameter')
        }

        const id = uuid.v4()

        await mkdir(__dirname + '/tmp').catch(() => {
            // do nothing, already exists
        })

        const filepath = path.resolve(__dirname + `/tmp/${id}.pdf`)

        const browser = await puppeteer.launch({
            args: [
                // Required for Docker version of Puppeteer
                '--no-sandbox',
                '--disable-setuid-sandbox',
                // This will write shared memory files into /tmp instead of /dev/shm,
                // because Docker’s default for /dev/shm is 64MB
                '--disable-dev-shm-usage'
            ]
        })

        const page = await browser.newPage()

        await page.goto(url, { waitUntil: 'networkidle2' })

        await wait(timeout)

        await page.pdf({
            path: filepath,
            format,
            pageRanges,
            margin: { top: margin, left: margin, bottom: margin, right: margin },
            printBackground,
            landscape,
            displayHeaderFooter
        })

        await browser.close()

        const file = fs.createReadStream(filepath)

        file.on('end', function () {
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.log('unlink err', err)
                }
            })
        })

        if (download) {
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
            res.setHeader('Content-Type', 'application/json')
        }

        file.pipe(res)

    } catch (e) {
        res.send(e.message)
    }
})

app.get("/", (req, res) => {
    res.send({
        name: pkg.name,
        version: pkg.version
    })
})

app.listen(PORT, () =>
    console.log(`${pkg.name}@${pkg.version} running at port ${PORT}`)
)