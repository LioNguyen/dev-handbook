import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { cn } from '@/shared/utils/utils'

export interface SearchInputProps {
  placeholder?: string
  value?: string
  onSearch?: (query: string) => void
  onClear?: () => void
  loading?: boolean
  className?: string
  'data-testid'?: string
}

const SearchInput = React.forwardRef<HTMLDivElement, SearchInputProps>(
  (
    {
      placeholder = 'Search...',
      value = '',
      onSearch,
      onClear,
      loading = false,
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const [query, setQuery] = React.useState(value)

    React.useEffect(() => {
      setQuery(value)
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setQuery(newValue)
    }

    const handleSearch = () => {
      onSearch?.(query)
    }

    const handleClear = () => {
      setQuery('')
      onClear?.()
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch()
      }
    }

    return (
      <div
        ref={ref}
        className={cn('relative flex items-center w-full max-w-sm', className)}
        data-testid={testId}
        {...props}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-10"
            disabled={loading}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={handleClear}
              disabled={loading}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export { SearchInput }
