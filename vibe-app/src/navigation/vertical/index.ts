import type { VerticalNavItems } from '@layouts/types'
import baseUi from './base-ui'
import nhms from './nhms'

export default [
    // ...dashboard, 
    // ...appsAndPages, 
    // ...uiElements, 
    // ...forms, 
    // ...charts, 
    ...nhms,
    ...baseUi,
    // ...others
] as VerticalNavItems
