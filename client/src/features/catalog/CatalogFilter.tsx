import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { ProductParams } from '../../type/product.type.ts'
import { useAppDispatch } from '../../store/store.ts'
import { setProductParams } from './catalogSlice.ts'
import CheckboxButton from '../../ui/CheckboxButton.tsx'

interface CatalogFilterProps {
  brands: string[]
  categories: string[]
  sortOptions: { value: string; label: string }[],
  productParams: ProductParams
}

function CatalogFilter({ brands, categories, sortOptions, productParams }: CatalogFilterProps) {
  const dispatch = useAppDispatch()

  return (
    <>
      <Paper sx={{ mb: 2 }}>
        <TextField label='Search product' variant='outlined' fullWidth
                   value={productParams.name || ''}
                   onChange={(e) => dispatch(setProductParams({ name: e.target.value }))}
        />
      </Paper>

      <Paper sx={{ mb: 2, p: 2 }}>
        <FormControl>
          <FormLabel id='radio-buttons'>Sort</FormLabel>
          <RadioGroup aria-labelledby='radio-buttons' defaultValue='name'
                      value={productParams.sort || ''}
                      onChange={(e) => dispatch(setProductParams({ sort: e.target.value }))}
          >
            {sortOptions.map(({ value, label }) => (
              <FormControlLabel value={value} label={label} key={value} control={<Radio />} />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <CheckboxButton
          items={categories}
          currentChecked={productParams.categoryName}
          onChange={(items: string[]) => dispatch(setProductParams({categoryName: items}))}
        />
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <CheckboxButton
          items={brands}
          currentChecked={productParams.brand}
          onChange={(items: string[]) => dispatch(setProductParams({brand: items}))}
        />
      </Paper>
    </>
  )
}

export default CatalogFilter
