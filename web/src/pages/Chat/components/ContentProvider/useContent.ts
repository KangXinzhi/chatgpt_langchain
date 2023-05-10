import { useContext } from 'react'

import type { Context } from './ContentProvider'
import { ContentContext } from './ContentProvider'

export default (): Context => useContext(ContentContext)
