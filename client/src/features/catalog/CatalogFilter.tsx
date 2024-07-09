import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { ProductParams } from '../../type/product.type.ts'
import { useAppDispatch } from '../../store/store.ts'
import { setProductParams } from './catalogSlice.ts'

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
        <FormGroup>
          {categories.map((category: string) => (
            <FormControlLabel label={category} key={category} control={<Checkbox />} />
          ))}
        </FormGroup>
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
        <FormGroup>
          {brands.map((brand: string) => (
            <FormControlLabel label={brand} key={brand} control={<Checkbox />} />
          ))}
        </FormGroup>
      </Paper>
    </>
  )
}

export default CatalogFilter
