import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { regions } from '../../global_regions_data.json';
import { Region } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getRandomRegion(): Region {
    // 計算總權重（總人口百分比）
    const totalWeight = regions.reduce((sum, region) => sum + region.populationPercentage, 0);

    // 生成隨機數（0 到總權重之間）
    const random = Math.random() * totalWeight;

    // 根據權重選擇區域
    let weightSum = 0;
    for (const region of regions) {
        weightSum += region.populationPercentage;
        if (random <= weightSum) {
            return region;
        }
    }

    // 預設返回第一個區域（理論上不會執行到這裡）
    return regions[0];
}
