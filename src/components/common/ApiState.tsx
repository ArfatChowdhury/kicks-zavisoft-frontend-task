'use client';

import React from 'react';
import { AlertCircle, PackageSearch, RefreshCcw } from 'lucide-react';

interface ApiStateProps {
    loading?: boolean;
    error?: string | null;
    isEmpty?: boolean;
    onRetry?: () => void;
    children?: React.ReactNode;
    skeleton?: React.ReactNode;
    emptyMessage?: string;
    errorMessage?: string;
}

const ApiState: React.FC<ApiStateProps> = ({
    loading,
    error,
    isEmpty,
    onRetry,
    children,
    skeleton,
    emptyMessage = "No products found.",
    errorMessage = "Failed to load data.",
}) => {
    if (loading) {
        return <>{skeleton}</>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="bg-red-50 p-6 rounded-[32px] mb-6">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#232321] mb-2 font-rubik uppercase">Oops! Something went wrong</h3>
                <p className="text-gray-500 mb-8 max-w-md">{error || errorMessage}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 bg-[#4A69E2] hover:bg-[#3b59c2] text-white px-8 py-4 rounded-xl font-bold uppercase transition-all shadow-lg active:scale-95"
                    >
                        <RefreshCcw className="w-5 h-5" />
                        Try Again
                    </button>
                )}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="bg-[#ECEEF0] p-6 rounded-[32px] mb-6">
                    <PackageSearch className="w-12 h-12 text-[#232321]/40" />
                </div>
                <h3 className="text-2xl font-bold text-[#232321] mb-2 font-rubik uppercase">Nothing Here</h3>
                <p className="text-gray-500 mb-4">{emptyMessage}</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default ApiState;
