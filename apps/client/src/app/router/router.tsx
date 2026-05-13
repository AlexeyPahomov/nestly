import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '../layout/AppLayout'
import { AllocationPage } from '../../pages/allocation-page'
import { CategoryPage } from '../../pages/category-page'
import { ExpensePage } from '../../pages/expense-page'
import { IncomePage } from '../../pages/income-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <IncomePage />,
      },
      {
        path: 'allocation',
        element: <AllocationPage />,
      },
      {
        path: 'expenses',
        element: <ExpensePage />,
      },
      {
        path: 'categories',
        element: <CategoryPage />,
      },
    ],
  },
])
