import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import CarListView from '@/cars/CarListView.vue'
import CarDetailsView from '@/cars/CarDetailsView.vue'

const mocks = vi.hoisted(() => ({
  TEST_CAR_LIST: [
    {
      id: 1,
      make: 'Ford',
      model: 'Focus'
    },
    {
      id: 2,
      make: 'Fiat',
      model: 'Uno'
    }
  ]
}))

vi.mock('@/cars/api.ts', () => ({
  fetchCarList: vi.fn().mockResolvedValue(mocks.TEST_CAR_LIST)
}))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/cars' },
    { path: '/cars', component: CarListView },
    { path: '/cars/:id', name: 'carDetails', component: CarDetailsView }
  ]
})

const renderComponent = () => {
  return render(CarListView, {
    global: {
      plugins: [router]
    }
  })
}

describe('CarListView.vue', () => {
  describe('heading', () => {
    it('should display header during loading', () => {
      renderComponent()

      expect(screen.getByRole('heading', 'Car list')).toBeVisible()
    })

    it('should display header with results', async () => {
      renderComponent()
      await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

      expect(screen.getByRole('heading', 'Car list')).toBeVisible()
    })
  })

  it('should display loader at component mount', () => {
    renderComponent()

    expect(screen.getByTestId('base-loader')).toBeVisible()
  })

  it('should hide loader and display table with data when received', async () => {
    renderComponent()
    await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

    expect(screen.getByRole('row', { name: '1 Ford Focus Details Edit' })).toBeVisible()
    expect(screen.getByRole('row', { name: '2 Fiat Uno Details Edit' })).toBeVisible()
  })

  it('should display table header', async () => {
    renderComponent()
    await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

    expect(screen.getByRole('columnheader', { name: 'Id' })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: 'Make' })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: 'Model' })).toBeVisible()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeVisible()
  })

  it.each(mocks.TEST_CAR_LIST)(
    'should render proper details link for row with id: $id',
    async ({ id, make, model }) => {
      renderComponent()
      await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

      const row = screen.getByRole('row', { name: `${id} ${make} ${model} Details Edit` })
      const rowDetailsLink = within(row).getByRole('link', { name: 'Details' })
      expect(rowDetailsLink.getAttribute('href')).toEqual(`/cars/${id}`)
    }
  )

  it.each(mocks.TEST_CAR_LIST)(
    'should render proper edit link for row with id: $id',
    async ({ id, make, model }) => {
      renderComponent()
      await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

      const row = screen.getByRole('row', { name: `${id} ${make} ${model} Details Edit` })
      const rowDetailsLink = within(row).getByRole('link', { name: 'Edit' })
      expect(rowDetailsLink.getAttribute('href')).toEqual('#')
    }
  )
})
