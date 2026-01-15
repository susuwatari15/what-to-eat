"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Language } from "@/lib/translations";

const FOOD_ICONS = [
	"🍜",
	"🍲",
	"🥘",
	"🍛",
	"🍝",
	"🍕",
	"🍣",
	"🥗",
	"🍱",
	"🥟",
	"🍩",
	"🍪",
	"🍰",
	"🍮",
	"🍯",
	"🍵",
];

interface DishPickerProps {
	dishes: string[];
	collectionName: string;
	language: Language;
}

export function DishPicker({
	dishes,
	collectionName,
	language,
}: DishPickerProps) {
	const [selectedDish, setSelectedDish] = useState<string | null>(null);
	const [isSpinning, setIsSpinning] = useState(false);

	const getRandomDish = () => {
		if (dishes.length === 0) return;

		setIsSpinning(true);

		let spins = 0;
		const spinInterval = setInterval(() => {
			setSelectedDish(dishes[Math.floor(Math.random() * dishes.length)]);
			spins++;

			if (spins > 15) {
				clearInterval(spinInterval);
				setSelectedDish(dishes[Math.floor(Math.random() * dishes.length)]);
				setIsSpinning(false);
			}
		}, 80);
	};

	const getRandomMealText = isSpinning
		? language === "vi"
			? "🔄 Đang chọn..."
			: "🔄 Getting a meal..."
		: language === "vi"
			? "✨ Chọn Ngẫu Nhiên"
			: "✨ Get a Random Meal";
	const noDishesText = language === "vi" ? "⚠️ Không có món" : "⚠️ No dishes";
	const addDishesFirstText =
		language === "vi"
			? "Thêm món ăn vào bộ sưu tập này trước!"
			: "Add some dishes to this collection first!";
	const pickFromText = language === "vi" ? "Chọn từ" : "Pick from";
	const dishesAvailableText =
		language === "vi" ? "món ăn có sẵn" : "dishes available";
	const notFeelingText =
		language === "vi"
			? "Không thích? Bấm lại để chọn món khác!"
			: "Not feeling it? Click again to get another suggestion!";

	return (
		<div>
			{/* Dish card */}
			<Card className="bg-white shadow-2xl border-2 border-secondary/20 mb-8 p-8 md:p-12">
				<div className="min-h-32 flex items-center justify-center mb-6">
					{selectedDish ? (
						<div className="text-center">
							<div className="text-5xl mb-4">
								{FOOD_ICONS[Math.floor(Math.random() * FOOD_ICONS.length)]}
							</div>
							<p
								className={`text-3xl md:text-4xl font-heading font-bold text-primary transition-all duration-300 ${isSpinning ? "scale-95 opacity-70" : "scale-100 opacity-100"}`}
							>
								{selectedDish}
							</p>
						</div>
					) : dishes.length === 0 ? (
						<div className="text-center text-muted-foreground">
							<div className="text-5xl mb-3">🍽️</div>
							<p className="text-xl font-heading">{addDishesFirstText}</p>
						</div>
					) : (
						<div className="text-center text-muted-foreground">
							<div className="text-5xl mb-3">🍽️</div>
							<p className="text-xl font-heading">
								{pickFromText} {collectionName}
							</p>
							<p className="text-sm mt-2">
								({dishes.length} {dishesAvailableText})
							</p>
						</div>
					)}
				</div>
			</Card>

			{/* Button */}
			<Button
				onClick={getRandomDish}
				disabled={isSpinning || dishes.length === 0}
				className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-heading rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
			>
				{isSpinning
					? language === "vi"
						? "Đang chọn..."
						: "Getting a meal..."
					: dishes.length === 0
						? noDishesText
						: getRandomMealText}
			</Button>

			{/* Subtitle */}
			{selectedDish && (
				<p className="mt-8 text-center text-sm text-muted-foreground font-sans">
					{notFeelingText}
				</p>
			)}
		</div>
	);
}
