import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Yuri' },
        { id: 2, name: 'Yssac' },
        { id: 3, name: 'Cassy' }
    ]

    return response.json(users)
}