import React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingFallbackProps {
  type?: "skeleton" | "spinner";
  title?: string;
  height?: string;
  className?: string;
}

export function LoadingFallback({
  type = "spinner",
  title = "Yükleniyor...",
  height = "h-[200px]",
  className = "",
}: LoadingFallbackProps) {
  if (type === "spinner") {
    return (
      <div className={`flex flex-col items-center justify-center ${height} ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">{title}</p>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent>
        <div className={`space-y-2 ${height}`}>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-20 w-full mt-4" />
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent className="py-2">
        <Skeleton className="h-6 w-1/2" />
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/6" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/6" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <div className="w-full h-full bg-muted/20 rounded-md flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </div>
  );
}
