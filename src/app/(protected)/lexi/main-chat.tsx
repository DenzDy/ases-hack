'use client';

import { Icon, LucideProps } from 'lucide-react';
import { owl } from '@lucide/lab';

const OwlIcon = (props: LucideProps) => (
    <Icon iconNode={owl} {...props} />
);

export default function MainChat() {
    return (
        <div className="flex-1 bg-white dark:bg-[#0F0F12] rounded-xl border
                    border-gray-200 dark:border-[#1F1F23] flex items-center
                    justify-center">
            <div className="text-center px-4 py-8">
                {/* Owl Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-300 via-pink-300 to-cyan-300
                        rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <OwlIcon className="h-8 w-8 stroke-[2.5] text-gray-900" />
                </div>

                {/* Heading / subtitle */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to Lexi AI
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Your intelligent Philippine legal assistant. Click <em>Draft Document</em>{' '}
                    above to start creating legal documents with AI assistance.
                </p>

                {/* Feature grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    {[
                        { title: '📄 Document Drafting', desc: 'Create legal documents with AI assistance' },
                        { title: '⚖️ Philippine Law', desc: 'Specialized in Philippine legal system' },
                        { title: '📋 Templates', desc: 'Pre-built templates for common documents' },
                        { title: '🔍 Document Review', desc: 'AI-powered document analysis' },
                    ].map(card => (
                        <div key={card.title}
                            className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                                {card.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
