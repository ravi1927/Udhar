import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useLayout() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const pad = width < 360 ? 12 : width >= 430 ? 20 : 16;
  const gap = width < 360 ? 8 : 10;
  const inner = width - pad * 2;
  const colWidth = Math.floor((inner - gap) / 2);

  return {
    width,
    height,
    pad,
    gap,
    inner,
    colWidth,
    isSmall: width < 360,
    isCompact: width < 400,
    titleSize: width < 360 ? 18 : 20,
    moneySize: width < 360 ? 26 : 32,
    insets,
  };
}
