import { test } from '../fixtures'

test.describe.parallel('Parallel test suite', () => {
  test('TC01 Verify navigation menu displays all categories', async ({ pm }) => {
    await pm.onHomePage().verifyNavigationMenuCategoriesArePresent()
  })

  test('Verify navigation menu categories redirect to the relevant page', async ({ pm }) => {
    await pm.onHomePage().verifyNavigationMenuCategoriesRedirectSuccessfully()
  })
})