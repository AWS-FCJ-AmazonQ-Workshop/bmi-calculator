import { describe, it, expect } from 'vitest'
import { app } from '../src/index'

describe('BMI Calculator', () => {
    it('should return health check', async () => {
        const res = await app.request('/healthcheck')
        expect(res.status).toBe(200)
    })

    it('should calculate BMI correctly', async () => {
        const res = await app.request('/bmi-calculator?height=1.75&weight=70&gender=male')
        const data = await res.json()
        expect(data.bmi).toBeCloseTo(22.86, 2)
        expect(data.category).toBe('Normal')
    })
})