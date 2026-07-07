import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from 'lib/utils';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFilterStore } from 'store/filterStore';

type FilterChipsProps = {
  onClearAll?: () => void;
};

export function FilterChips({ onClearAll }: FilterChipsProps) {
  const {
    type,
    bedrooms,
    minPrice,
    maxPrice,
    setType,
    setBedrooms,
    setMinPrice,
    setMaxPrice,
  } = useFilterStore();

  const hasActiveFilters = type !== null || bedrooms !== null || minPrice !== null || maxPrice !== null;

  if (!hasActiveFilters) return null;

  const getBedroomText = (value: number) => {
    if (value === 4) return '4+ beds';
    return `${value} bed${value > 1 ? 's' : ''}`;
  };

  const getPriceText = () => {
    if (minPrice && maxPrice) {
      return `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`;
    }
    if (minPrice) {
      return `From ${formatPrice(minPrice)}`;
    }
    if (maxPrice) {
      return `Up to ${formatPrice(maxPrice)}`;
    }
    return '';
  };

  const handleClearAll = () => {
    setType(null);
    setBedrooms(null);
    setMinPrice(null);
    setMaxPrice(null);
    onClearAll?.();
  };

  return (
    <View className="mt-3 flex-row flex-wrap gap-2">
      {type && (
        <FilterChip
          label={type}
          icon={<Ionicons name="home-outline" size={11} color="#1D4ED8" />}
          onClear={() => setType(null)}
        />
      )}

      {bedrooms !== null && (
        <FilterChip
          label={getBedroomText(bedrooms)}
          icon={<Ionicons name="bed-outline" size={11} color="#1D4ED8" />}
          onClear={() => setBedrooms(null)}
        />
      )}

      {(minPrice !== null || maxPrice !== null) && (
        <FilterChip
          label={getPriceText()}
          icon={<Ionicons name="cash-outline" size={11} color="#1D4ED8" />}
          onClear={() => {
            setMinPrice(null);
            setMaxPrice(null);
          }}
        />
      )}

      {/* Clear all button - optional but nice to have */}
      <TouchableOpacity
        onPress={handleClearAll}
        className="flex-row items-center gap-1 rounded-full border border-red-200 bg-red-50 px-3 py-1"
      >
        <Text className="text-xs font-semibold text-red-600">Clear all</Text>
        <Ionicons name="close" size={12} color="#DC2626" />
      </TouchableOpacity>
    </View>
  );
}

// Reusable FilterChip component
type FilterChipProps = {
  label: string;
  icon?: React.ReactNode;
  onClear: () => void;
};

function FilterChip({ label, icon, onClear }: FilterChipProps) {
  return (
    <View className="flex-row items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
      {icon}
      <Text className="text-xs font-semibold capitalize text-blue-700">{label}</Text>
      <TouchableOpacity onPress={onClear}>
        <Ionicons name="close" size={12} color="#1D4ED8" />
      </TouchableOpacity>
    </View>
  );
}