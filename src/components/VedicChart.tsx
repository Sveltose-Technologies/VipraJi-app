import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface Planet {
  name: string;
  house: number;
}

interface VedicChartProps {
  planets: Planet[];
  size?: number;
}

const VedicChart: React.FC<VedicChartProps> = ({ planets, size = 300 }) => {
  const { colors } = useTheme();

  // The diagonal length of the diamond is equal to the size of the box.
  // side * sqrt(2) = size => side = size / sqrt(2)
  const diamondSize = size / Math.SQRT2;
  const offset = (size - diamondSize) / 2;

  const renderHouseContent = (house: number, style: any) => {
    const housePlanets = planets.filter(p => p.house === house);
    return (
      <View style={[styles.houseContainer, style]}>
        <Text style={[styles.houseNumber, { color: colors.primary + '80' }]}>{house}</Text>
        {housePlanets.map((p, i) => (
          <Text key={i} style={[styles.planetText, { color: colors.text }]}>
            {p.name}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { width: size, height: size, borderColor: colors.border, backgroundColor: colors.surface }]}>
      {/* Diagonals */}
      <View style={[styles.line, styles.diagonal1, { width: size * 1.414, borderColor: colors.border }]} />
      <View style={[styles.line, styles.diagonal2, { width: size * 1.414, borderColor: colors.border }]} />

      {/* Inner Diamond */}
      <View
        style={[
          styles.diamond,
          {
            width: diamondSize,
            height: diamondSize,
            top: offset,
            left: offset,
            borderColor: colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      />

      {/* Cross lines inside diamond (horizontal and vertical) */}
      <View style={[styles.line, styles.horizontal, { width: size, top: size / 2, borderColor: colors.border }]} />
      <View style={[styles.line, styles.vertical, { height: size, left: size / 2, borderColor: colors.border }]} />

      {/* House Contents positioned manually */}
      {/* H1 (Top Diamond) */}
      {renderHouseContent(1, { top: size * 0.15, left: size * 0.4, width: size * 0.2, alignItems: 'center' })}
      {/* H2 (Top Left Triangle) */}
      {renderHouseContent(2, { top: size * 0.05, left: size * 0.15, width: size * 0.2 })}
      {/* H3 (Bottom Left Triangle of Top Left Square) */}
      {renderHouseContent(3, { top: size * 0.25, left: size * 0.05, width: size * 0.2 })}
      {/* H4 (Left Diamond) */}
      {renderHouseContent(4, { top: size * 0.4, left: size * 0.15, width: size * 0.2, alignItems: 'center' })}
      {/* H5 (Bottom Left Triangle of Bottom Left Square) */}
      {renderHouseContent(5, { top: size * 0.65, left: size * 0.05, width: size * 0.2 })}
      {/* H6 (Bottom Right Triangle of Bottom Left Square) */}
      {renderHouseContent(6, { top: size * 0.85, left: size * 0.15, width: size * 0.2 })}
      {/* H7 (Bottom Diamond) */}
      {renderHouseContent(7, { top: size * 0.75, left: size * 0.4, width: size * 0.2, alignItems: 'center' })}
      {/* H8 (Bottom Right Triangle) */}
      {renderHouseContent(8, { top: size * 0.85, left: size * 0.65, width: size * 0.2 })}
      {/* H9 (Top Right Triangle of Bottom Right Square) */}
      {renderHouseContent(9, { top: size * 0.65, left: size * 0.75, width: size * 0.2 })}
      {/* H10 (Right Diamond) */}
      {renderHouseContent(10, { top: size * 0.4, left: size * 0.65, width: size * 0.2, alignItems: 'center' })}
      {/* H11 (Top Right Triangle of Top Right Square) */}
      {renderHouseContent(11, { top: size * 0.25, left: size * 0.75, width: size * 0.2 })}
      {/* H12 (Top Left Triangle of Top Right Square) */}
      {renderHouseContent(12, { top: size * 0.05, left: size * 0.65, width: size * 0.2 })}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  line: {
    position: 'absolute',
    borderTopWidth: 2,
  },
  diagonal1: {
    top: 0,
    left: 0,
    transformOrigin: 'top left',
    transform: [{ rotate: '45deg' }],
  },
  diagonal2: {
    top: 0,
    right: 0,
    transformOrigin: 'top right',
    transform: [{ rotate: '-45deg' }],
  },
  diamond: {
    position: 'absolute',
    borderWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
  horizontal: {
    left: 0,
  },
  vertical: {
    borderTopWidth: 0,
    borderLeftWidth: 2,
    top: 0,
  },
  houseContainer: {
    position: 'absolute',
    padding: 2,
    zIndex: 10,
  },
  houseNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  planetText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default VedicChart;
