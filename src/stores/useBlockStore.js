import { defineStore } from 'pinia';
import chatgpt4o from '@/assets/images/dashboard/chatgpt-4o.png';
import chatgpt4mini from '@/assets/images/dashboard/chatgpt-4-mini.jpeg';
import claude from '@/assets/images/claude.png';
import liama from '@/assets/images/dashboard/liama.png';
import perplexityAi from '@/assets/images/dashboard/perplexity-ai.png';
import mistral from '@/assets/images/dashboard/mistral.png';
import gemini from '@/assets/images/gemini.png';
import groq from '@/assets/images/dashboard/groq.png';
import o1 from '@/assets/images/dashboard/o1.png';

export const useBlockStore = defineStore('blocks', {
  state: () => ({
    blocks: [
      { id: 1, img: chatgpt4o, title: 'ChatGPT-4o', description: 'Best for creative writing and coding', selected: false },
      { id: 2, img: chatgpt4mini, title: 'ChatGPT-4omini', description: 'Faster responses for quick tasks', selected: false },
      { id: 3, img: claude, title: 'Claude', description: 'Exceptional at analysis and research', selected: false },
      { id: 4, img: liama, title: 'Llama 3', description: 'Open source, runs on your device', selected: false },
      { id: 5, img: perplexityAi, title: 'Perplexity AI', description: 'Real-time info and web search', selected: false },
      { id: 6, img: mistral, title: 'Mistral Large', description: 'Fast and reliable responses', selected: false },
      { id: 7, img: gemini, title: 'Gemini 1.5 Pro', description: 'Excellent at visual understanding', selected: false },
      { id: 8, img: groq, title: 'Groq', description: 'Lightning-fast processing speed', selected: false },
      { id: 9, img: o1, title: 'O1', description: 'Optimized for business tasks', selected: false },
    ],
  }),
  actions: {
    toggleSelection(blockId) {
      const block = this.blocks.find(b => b.id === blockId);
      if (block) {
        block.selected = !block.selected;
      }
    },
  },
});
