import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  label: string;
  value: string | number;
  delta?: number | null; // percent change
  onPress?: () => void;
  sparkline?: React.ReactNode;
}

export default function StatsCard({ label, value, delta, onPress, sparkline }: Props) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center bg-white rounded-2xl p-3 shadow-md mr-2">
      <View className="flex-1">
        <Text className="text-sm text-gray-500">{label}</Text>
        <Text className="text-xl font-bold">{value}</Text>
        {delta !== undefined && delta !== null && (
          <Text className={`text-xs ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>{delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%</Text>
        )}
      </View>
      <View className="w-20 h-10">{sparkline}</View>
    </TouchableOpacity>
  );
}
