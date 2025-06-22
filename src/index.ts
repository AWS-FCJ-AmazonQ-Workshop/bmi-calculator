import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

export const app = new Hono()

app.get('/healthcheck', (c) => {
    return c.json({ status: 'OK' })
})

app.get('/bmi-calculator', (c) => {
    const gender = c.req.query('gender')
    const height = parseFloat(c.req.query('height') || '0')
    const weight = parseFloat(c.req.query('weight') || '0')

    if (!gender || !height || !weight) {
        return c.json({ error: 'Missing required parameters: gender, height, weight' }, 400)
    }

    const bmi = weight / (height * height)

    const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'

    return c.json({
        gender,
        height,
        weight,
        bmi: Math.round(bmi * 100) / 100,
        category
    })
})

export const handler = handle(app)