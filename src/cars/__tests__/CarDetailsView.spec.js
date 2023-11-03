import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CarDetailsView from '@/cars/CarDetailsView.vue'
import { fetchCarDetails } from '@/cars/api'

vi.mock('@/users/api.ts', () => ({
  fetchUserList: vi.fn().mockResolvedValue([
    { id: 1, name: 'Test' },
    { id: 6, name: 'Bob' }
  ])
}))

vi.mock('@/cars/api.ts', () => ({
  fetchCarDetails: vi.fn().mockResolvedValue({
    id: 1,
    make: 'Fiat',
    model: 'Panda',
    year: 2005,
    color: 'red',
    user: {
      id: 6,
      name: 'Bob'
    }
  })
}))

const renderComponent = (id) => {
  return render(CarDetailsView, {
    props: {
      id
    }
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CarDetailsView.vue', () => {
  describe('heading', () => {
    it('should display header during loading', () => {
      renderComponent(1)

      expect(screen.getByRole('heading', 'Car details')).toBeVisible()
    })

    it('should display header with results', async () => {
      renderComponent(1)
      await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

      expect(screen.getByRole('heading', 'Car details')).toBeVisible()
    })
  })

  it('should display loader at component mount', () => {
    renderComponent(1)

    expect(screen.getByTestId('base-loader')).toBeVisible()
  })

  it('should hide loader when data received', async () => {
    renderComponent(1)
    await waitFor(() => {
      expect(screen.queryByTestId('base-loader')).not.toBeInTheDocument()
    })
  })

  it.each([
    {
      label: 'Id',
      value: '1'
    },
    {
      label: 'Make',
      value: 'Fiat'
    },
    {
      label: 'Model',
      value: 'Panda'
    },
    {
      label: 'Year',
      value: '2005'
    },
    {
      label: 'Color',
      value: 'red'
    },
    {
      label: 'Owner',
      value: 'Bob'
    }
  ])('should display $label input with proper value', async ({ label, value }) => {
    renderComponent(1)
    await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

    expect(screen.getByLabelText(label)).toHaveDisplayValue(value)
  })

  it.each(['Id', 'Make', 'Model', 'Year', 'Color', 'Owner'])(
    'should have disabled state on %s input',
    async (label) => {
      renderComponent(1)
      await waitForElementToBeRemoved(() => screen.queryByTestId('base-loader'))

      expect(screen.getByLabelText(label)).toBeDisabled()
    }
  )

  it('should execute "fetchCarDetails" method with proper param', () => {
    renderComponent(1234)

    expect(fetchCarDetails).toHaveBeenCalledOnce()
    expect(fetchCarDetails).toHaveBeenCalledWith(1234)
  })
})
