import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/axios";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { useEffect, useRef, useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthGuard } from "@/hooks/useAuthGuard";


interface RoomTemplate {
    id: number;
    title: string;
    entry_fee: number;
    min_players: number;
    max_players: number;
    min_cards: number;
    max_cards: number;
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

    useAuthGuard();
    // waiting state for templates user has joined
    const [waitingIds, setWaitingIds] = useState<Set<number>>(new Set());
    const [joiningIds, setJoiningIds] = useState<Set<number>>(new Set());
    const [cancellingIds, setCancellingIds] = useState<Set<number>>(new Set());
    // Dialog targets
    const [joinTarget, setJoinTarget] = useState<RoomTemplate | null>(null);
    const [cancelTarget, setCancelTarget] = useState<RoomTemplate | null>(null);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        status,
        isFetching
    } = useInfiniteQuery({
        queryKey: ["/api/v1/daberton/roomtemplate"],
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
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

    // Add a local state to track join loading per room
    const [joinLoadingId, setJoinLoadingId] = useState<number | null>(null);

    // Mutation: join room template (place user into waiting queue)
    const joinMutation = useMutation({
        mutationFn: async ({ id, cardCount }: { id: number; cardCount: number }) => {
            setJoinLoadingId(id);
            const res = await axiosInstance.post(`/api/v1/daberton/roomtemplate/${id}/join`, { card_count: cardCount });
            return res.data;
        },
        onSuccess: (_data, variables) => {
            setJoiningIds(prev => { const n = new Set(prev); n.delete(variables.id); return n; });
            setWaitingIds(prev => { const n = new Set(prev); n.add(variables.id); return n; });
            setJoinLoadingId(null);
        },
        onError: (_err, variables) => {
            setJoiningIds(prev => { const n = new Set(prev); n.delete(variables.id); return n; });
            setJoinLoadingId(null);
        }
    });

    // Mutation: cancel waiting
    const cancelMutation = useMutation({
        mutationFn: async (id: number) => {
            setJoinLoadingId(id);
            const res = await axiosInstance.post(`/api/v1/daberton/roomtemplate/userwaitings/${id}/cancel`);
            return res.data;
        },
        onSuccess: (_data, id) => {
            setCancellingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
            setWaitingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
            setJoinLoadingId(null);
        },
        onError: (_err, id) => {
            setCancellingIds(prev => { const n = new Set(prev); n.delete(id); return n; });
            setJoinLoadingId(null);
        }
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

    const handleJoinClick = (item: RoomTemplate) => {
        if (waitingIds.has(item.id) || joiningIds.has(item.id)) return;
        setJoinTarget(item);
    };
    const confirmJoin = (cardCount: number) => {
        if (!joinTarget) return;
        setJoiningIds(prev => new Set(prev).add(joinTarget.id));
        joinMutation.mutate({ id: joinTarget.id, cardCount });
        setJoinTarget(null);
    };
    const handleCancelClick = (item: RoomTemplate) => {
        if (!waitingIds.has(item.id) || cancellingIds.has(item.id)) return;
        setCancelTarget(item);
    };
    const confirmCancel = () => {
        if (!cancelTarget) return;
        const item = cancelTarget;
        setCancellingIds(prev => new Set(prev).add(item.id));
        cancelMutation.mutate(item.id);
        setCancelTarget(null);
    };

    return (
        // اضافه کردن فاصله از بالا برای جلوگیری از تداخل با دکمه close تلگرام
        <div className="p-4 space-y-4 pt-10">
            <div className="flex items-center justify-between sticky top-0 z-20 backdrop-blur border-b border-gray-200 pb-2 mb-4 p-4 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold">Rooms</h2>
                <div className="flex gap-2">
                    {(isFetching || joinLoadingId !== null) ? (
                        <span className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin inline-block" aria-label="Loading" />
                    ) : (
                        <Button
                            variant={"secondary"}
                            onClick={() => refetch()} className="text-sm px-3 py-1 border rounded-md hover:bg-accent">Refresh</Button>
                    )}
                </div>
            </div>

            {isLoading && <div>Loading...</div>}
            {isError && <div className="text-red-500 text-sm">Error: {(error as Error)?.message}</div>}

            {status === 'success' && (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {items.map((item) => {
                            const isWaiting = waitingIds.has(item.id);
                            const isJoining = joiningIds.has(item.id);
                            const isCancelling = cancellingIds.has(item.id);
                            return (
                                <Card
                                    key={item.id}
                                    className={`min-h-0 min-w-0 relative transition border ${isWaiting ? 'border-yellow-500' : ''} ${isJoining ? 'opacity-60' : ''}`}
                                >
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-center">
                                            <span>{item.title || `#${item.id}`}</span>
                                            {/*<span className="text-xs px-2 py-1 rounded-md border">{item.game_style}</span>*/}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-xs space-y-1">
                                        <div className="flex justify-between">
                                            <span>Entry Fee</span><span>{item.entry_fee}$</span></div>
                                        <div className="flex justify-between">
                                            <span>Players</span><span>{item.min_players} - {item.max_players} 👤</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Cards</span><span>{item.min_cards} - {item.max_cards} 🏁</span></div>
                                        {isWaiting && (
                                            <div className="pt-2 space-y-2">
                                                <div
                                                    className="text-yellow-600 font-semibold flex items-center gap-1 text-[10px]">Waiting
                                                    in queue...
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-[10px] h-auto py-1 px-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCancelClick(item);
                                                    }}
                                                    disabled={isCancelling}
                                                >
                                                    {isCancelling ? 'Cancelling...' : 'Cancel'}
                                                </Button>
                                            </div>
                                        )}
                                        {isJoining && !isWaiting && (
                                            <div className="pt-2 text-[10px] text-muted-foreground">Joining...</div>
                                        )}


                                    </CardContent>
                                    {/*<div className="flex justify-between items-center mt-4">*/}
                                    {/*    */}
                                    {/*</div>*/}
                                    {!isJoining && !isWaiting && (
                                        <CardFooter className="flex-col gap-2">
                                            <Button
                                                disabled={
                                                    joiningIds.has(item.id) ||
                                                    waitingIds.has(item.id)
                                                }
                                                className="w-full"
                                                onClick={() => handleJoinClick(item)}>
                                                Join
                                            </Button>
                                        </CardFooter>
                                    )}

                                </Card>
                            );
                        })}
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-4">
                        {!hasNextPage && items.length > 0 && (
                            <div className="text-xs text-muted-foreground">All pages loaded.</div>
                        )}
                        {hasNextPage && (
                            <div className="text-xs text-muted-foreground">Loading more when you reach the bottom...</div>
                        )}
                        {isFetchingNextPage && <div className="text-xs">Loading next page...</div>}
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

            {/* Join Confirmation Dialog */}
            <Dialog open={!!joinTarget} onOpenChange={(o) => { if (!o) { setJoinTarget(null); } }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>انتخاب تعداد کارت</DialogTitle>
                        <DialogDescription>
                            {joinTarget ? `تعداد کارت مورد نظر را انتخاب کنید (${joinTarget.min_cards} تا ${joinTarget.max_cards})` : ''}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        {joinTarget && (
                            <div className="flex gap-2 flex-wrap justify-center w-full">
                                {Array.from({ length: joinTarget.max_cards - joinTarget.min_cards + 1 }, (_, i) => joinTarget.min_cards + i).map((count) => (
                                    <Button
                                        key={count}
                                        onClick={() => confirmJoin(count)}
                                        disabled={joiningIds.has(joinTarget.id)}
                                    >
                                        {count}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* Cancel Confirmation Dialog */}
            <Dialog open={!!cancelTarget} onOpenChange={(o) => { if (!o) setCancelTarget(null); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Waiting</DialogTitle>
                        <DialogDescription>
                            {cancelTarget ? `Cancel waiting for "${cancelTarget.title}" and release blocked entry fee?` : ''}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setCancelTarget(null)}>Back</Button>
                        <Button variant="destructive" onClick={confirmCancel} disabled={cancelTarget ? cancellingIds.has(cancelTarget.id) : false}>Confirm Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Roomtemplates
