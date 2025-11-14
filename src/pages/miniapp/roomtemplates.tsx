import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef, useCallback } from "react";


interface RoomTemplate {
    id: number;
    title: string;
    entry_fee: number;
    min_players: number;
    max_players: number;
    timeout: number;
    game_style: string;
    is_public: boolean;
    is_system: boolean;
    is_active: boolean;
}

interface RoomTemplateResponse {
    _error_code: string;
    _message: string | null;
    _status: string;
    data: RoomTemplate[];
    pagination: {
        page: number;
        page_size: number;
        total_rows: number;
        total_pages: number;
    };
}

function Roomtemplates() {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        status
    } = useInfiniteQuery<RoomTemplateResponse, Error>({
        queryKey: ["/api/v1/daberton/roomtemplate"],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosInstance.get<RoomTemplateResponse>(`/api/v1/daberton/roomtemplate?page_size=5&page=${pageParam}`);
            return res.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage.pagination.page;
            const total = lastPage.pagination.total_pages;
            return current < total ? current + 1 : undefined;
        },
    });

    // Combine all pages' data
    const items: RoomTemplate[] = data?.pages?.flatMap((page) => page.data) ?? [];

    // Intersection Observer sentinel
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(onIntersect, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        });
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [onIntersect]);

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Room Templates</h2>
                <div className="flex gap-2">
                    <button onClick={() => refetch()} className="text-sm px-3 py-1 border rounded-md hover:bg-accent">Refresh</button>
                </div>
            </div>

            {isLoading && <div>Loading...</div>}
            {isError && <div className="text-red-500 text-sm">Error: {(error as Error)?.message}</div>}

            {status === 'success' && (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <Card key={item.id}>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{item.title || `#${item.id}`}</span>
                                        <span className="text-xs px-2 py-1 rounded-md border">{item.game_style}</span>
                                    </CardTitle>
                                    <CardDescription>ID: {item.id}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-xs space-y-1">
                                    <div className="flex justify-between"><span>Entry Fee</span><span>{item.entry_fee}</span></div>
                                    <div className="flex justify-between"><span>Players</span><span>{item.min_players} - {item.max_players}</span></div>
                                    <div className="flex justify-between"><span>Timeout</span><span>{item.timeout}</span></div>
                                    <div className="flex justify-between"><span>Public</span><span>{item.is_public ? 'Yes' : 'No'}</span></div>
                                    <div className="flex justify-between"><span>System</span><span>{item.is_system ? 'Yes' : 'No'}</span></div>
                                    <div className="flex justify-between"><span>Active</span><span>{item.is_active ? 'Yes' : 'No'}</span></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-4">
                        {!hasNextPage && items.length > 0 && (
                            <div className="text-xs text-muted-foreground">All pages loaded.</div>
                        )}
                        {hasNextPage && (
                            <div className="text-xs text-muted-foreground">Loading more when you reach the bottom...</div>
                        )}
                        {isFetchingNextPage && <div className="text-xs">Loading next page...</div>}
                        {/* Manual fallback button if intersection fails */}
                        {hasNextPage && (
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="text-xs px-3 py-1 border rounded-md hover:bg-accent disabled:opacity-50"
                            >
                                {isFetchingNextPage ? 'Loading...' : 'Load more'}
                            </button>
                        )}
                        <div ref={sentinelRef} className="h-2 w-full" />
                    </div>

                    {/* Pagination summary - last page info */}
                    {data?.pages?.length ? (
                        <div className="text-xs text-muted-foreground">
                            {(() => {
                                const last = data.pages[data.pages.length - 1];
                                return `Page ${last.pagination.page} of ${last.pagination.total_pages} • Loaded ${items.length} / ${last.pagination.total_rows}`;
                            })()}
                        </div>
                    ) : null}
                </>
            )}
        </div>
    );
}

export default Roomtemplates