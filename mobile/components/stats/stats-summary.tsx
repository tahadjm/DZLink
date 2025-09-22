import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Text, View } from "react-native";

import { SourceBreakdown, StatsSummaryDTO } from "@/types/";
import { Skeleton } from "../skeleton";

interface StatsSummaryProps {
  stats: StatsSummaryDTO;
  sources: SourceBreakdown[];
  loading: boolean;
}

export function StatsSummary({ stats, sources, loading }: StatsSummaryProps) {
  if (loading)
    return (
      <View>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-40" />
          </CardHeader>

          <Separator className="w-full h-[1px] my-2" />

          <CardContent className="gap-4">
            <View className="flex-row justify-between">
              {[1, 2, 3, 4].map((i) => (
                <View key={i} className="items-center">
                  <Skeleton className="h-5 w-12 mb-1" />
                  <Skeleton className="h-3 w-10" />
                </View>
              ))}
            </View>

            <Separator className="w-full h-[1px] my-2" />
            <View>
              <Skeleton className="h-5 w-20 mb-3" />
              {[1, 2, 3].map((i) => (
                <View
                  key={i}
                  className="flex-row justify-between items-center mb-2"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-10" />
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>
    );
  return (
    <Card>
      <CardHeader>
        <Text className="text-lg font-avenirBold">Mes Statistiques</Text>
        <Text className="text-sm text-muted-foreground">
          {stats.periodStart} → {stats.periodEnd}
        </Text>
      </CardHeader>

      <Separator className="w-full h-[1px] my-2" />

      <CardContent className="gap-4">
        {/* Metrics row */}
        <View className="flex-row justify-between">
          <View>
            <Text className="text-base font-avenirBold">{stats.visits}</Text>
            <Text className="text-sm text-muted-foreground">Visites</Text>
          </View>
          <View>
            <Text className="text-base font-avenirBold">{stats.clicks}</Text>
            <Text className="text-sm text-muted-foreground">Clics</Text>
          </View>
          <View>
            <Text className="text-base font-avenirBold">{stats.leads}</Text>
            <Text className="text-sm text-muted-foreground">Leads</Text>
          </View>
          <View>
            <Text className="text-base font-avenirBold">
              {stats.revenue
                ? `${stats.revenue.amount} ${stats.revenue.currency}`
                : "-"}
            </Text>
            <Text className="text-sm text-muted-foreground">Sponsors</Text>
          </View>
        </View>

        <Separator className="w-full h-[1px]" />

        {/* Sources */}
        <View>
          <Text className="text-base font-avenirBold mb-2">Sources</Text>
          {sources.map((src, idx) => (
            <View key={idx} className="flex-row justify-between">
              <Text className="text-sm">{src.source}</Text>
              <Text className="text-sm font-avenirBold">
                {src.count} ({src.percent.toFixed(1)}%)
              </Text>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}
