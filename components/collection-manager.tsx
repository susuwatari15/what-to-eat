"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import type { Language } from "@/lib/translations";

interface CollectionManagerProps {
	collections: Record<string, string[]>;
	onCollectionsChange: (collections: Record<string, string[]>) => void;
	selectedCollection: string;
	onSelectCollection: (name: string) => void;
	language: Language;
}

export function CollectionManager({
	collections,
	onCollectionsChange,
	selectedCollection,
	onSelectCollection,
	language,
}: CollectionManagerProps) {
	const [isAdding, setIsAdding] = useState(false);
	const [newName, setNewName] = useState("");
	const [newDish, setNewDish] = useState("");
	const [isBulkMode, setIsBulkMode] = useState(false);
	const [bulkDishes, setBulkDishes] = useState("");

	const handleAddCollection = () => {
		if (newName.trim() && !collections[newName]) {
			const updated = { ...collections, [newName]: [] };
			onCollectionsChange(updated);
			onSelectCollection(newName);
			setNewName("");
			setIsAdding(false);
		}
	};

	const handleDeleteCollection = (name: string) => {
		if (name === "default") return;
		const updated = { ...collections };
		delete updated[name];
		onCollectionsChange(updated);
	};

	const handleAddDish = () => {
		if (newDish.trim() && selectedCollection) {
			const updated = { ...collections };
			if (!updated[selectedCollection].includes(newDish)) {
				updated[selectedCollection] = [...updated[selectedCollection], newDish];
				onCollectionsChange(updated);
				setNewDish("");
			}
		}
	};

	const handleBulkAddDishes = () => {
		if (bulkDishes.trim() && selectedCollection) {
			const dishesArray = bulkDishes
				.split(",")
				.map((dish) => dish.trim())
				.filter((dish) => dish.length > 0);

			const updated = { ...collections };
			const currentDishes = new Set(updated[selectedCollection]);
			let addedCount = 0;

			dishesArray.forEach((dish) => {
				if (!currentDishes.has(dish)) {
					currentDishes.add(dish);
					addedCount++;
				}
			});

			updated[selectedCollection] = Array.from(currentDishes);
			onCollectionsChange(updated);
			setBulkDishes("");
			setIsBulkMode(false);
		}
	};

	const handleRemoveDish = (dish: string) => {
		const updated = { ...collections };
		updated[selectedCollection] = updated[selectedCollection].filter(
			(d) => d !== dish,
		);
		onCollectionsChange(updated);
	};

	const myCollectionsText =
		language === "vi" ? "Bộ Sưu Tập Của Tôi" : "My Collections";
	const newCollectionText =
		language === "vi" ? "Bộ Sưu Tập Mới" : "New Collection";
	const collectionNameText =
		language === "vi" ? "Tên bộ sưu tập" : "Collection name";
	const createText = language === "vi" ? "Tạo" : "Create";
	const cancelText = language === "vi" ? "Hủy" : "Cancel";
	const addDishText = language === "vi" ? "Thêm Món Ăn" : "Add Dish";
	const enterDishNameText =
		language === "vi" ? "Nhập tên món ăn" : "Enter a dish name";
	const addText = language === "vi" ? "Thêm" : "Add";
	const dishesText = language === "vi" ? "Món ăn" : "Dishes";
	const bulkAddText = language === "vi" ? "Thêm Nhiều" : "Bulk Add";
	const bulkImportText =
		language === "vi"
			? "Nhập danh sách (cách nhau bằng dấu phẩy)"
			: "Enter meals separated by commas";
	const bulkImportPlaceholderText =
		language === "vi"
			? "Ví dụ: Phở, Cơm Tấm, Bánh Mì"
			: "e.g., Pizza, Sushi, Pasta";

	return (
		<Card className="bg-white shadow-lg border-2 border-secondary/20 p-6 h-fit lg:sticky lg:top-4">
			<h2 className="text-2xl font-heading font-bold text-primary mb-4">
				{myCollectionsText}
			</h2>

			{/* Collections list */}
			<div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
				{Object.keys(collections).map((name) => (
					<button
						type="button"
						key={name}
						onClick={() => onSelectCollection(name)}
						className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
							selectedCollection === name
								? "bg-primary text-primary-foreground font-semibold"
								: "bg-secondary/10 text-foreground hover:bg-secondary/20"
						}`}
					>
						<div className="flex items-center justify-between">
							<span>
								{name} ({collections[name].length})
							</span>
							{name !== "default" && (
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										handleDeleteCollection(name);
									}}
									className="text-xs opacity-60 hover:opacity-100"
								>
									<Trash2 size={16} />
								</button>
							)}
						</div>
					</button>
				))}
			</div>

			{/* Add collection button */}
			{!isAdding ? (
				<Button
					onClick={() => setIsAdding(true)}
					className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mb-6"
					size="sm"
				>
					<Plus size={16} className="mr-2" />
					{newCollectionText}
				</Button>
			) : (
				<div className="mb-6 space-y-2">
					<Input
						placeholder={collectionNameText}
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleAddCollection()}
						className="text-sm"
						autoFocus
					/>
					<div className="flex gap-2">
						<Button
							onClick={handleAddCollection}
							size="sm"
							className="flex-1 text-xs"
						>
							{createText}
						</Button>
						<Button
							onClick={() => {
								setIsAdding(false);
								setNewName("");
							}}
							variant="outline"
							size="sm"
							className="flex-1 text-xs"
						>
							{cancelText}
						</Button>
					</div>
				</div>
			)}

			{/* Add dish section */}
			{selectedCollection && (
				<div className="border-t border-secondary/20 pt-4">
					<h3 className="text-sm font-heading font-semibold text-primary mb-2">
						{addDishText}
					</h3>
					<div className="space-y-2">
						{!isBulkMode ? (
							<>
								<Input
									placeholder={enterDishNameText}
									value={newDish}
									onChange={(e) => setNewDish(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && handleAddDish()}
									className="text-sm"
								/>
								<div className="flex gap-2">
									<Button
										onClick={handleAddDish}
										size="sm"
										className="flex-1 text-xs"
									>
										<Plus size={14} className="mr-1" />
										{addText}
									</Button>
									<Button
										onClick={() => setIsBulkMode(true)}
										variant="outline"
										size="sm"
										className="flex-1 text-xs"
									>
										{bulkAddText}
									</Button>
								</div>
							</>
						) : (
							<>
								<p className="text-xs text-muted-foreground">
									{bulkImportText}
								</p>
								<textarea
									placeholder={bulkImportPlaceholderText}
									value={bulkDishes}
									onChange={(e) => setBulkDishes(e.target.value)}
									className="w-full px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
									rows={3}
								/>
								<div className="flex gap-2">
									<Button
										onClick={handleBulkAddDishes}
										size="sm"
										className="flex-1 text-xs"
									>
										<Plus size={14} className="mr-1" />
										{addText}
									</Button>
									<Button
										onClick={() => {
											setIsBulkMode(false);
											setBulkDishes("");
										}}
										variant="outline"
										size="sm"
										className="flex-1 text-xs"
									>
										{cancelText}
									</Button>
								</div>
							</>
						)}
					</div>

					{/* Current dishes */}
					{collections[selectedCollection].length > 0 && (
						<div className="mt-4">
							<p className="text-xs font-semibold text-muted-foreground mb-2">
								{dishesText} ({collections[selectedCollection].length})
							</p>
							<div className="space-y-1 max-h-32 overflow-y-auto">
								{collections[selectedCollection].map((dish) => (
									<div
										key={dish}
										className="flex items-center justify-between bg-secondary/5 px-2 py-1 rounded text-xs group"
									>
										<span className="truncate">{dish}</span>
										<button
											type="button"
											onClick={() => handleRemoveDish(dish)}
											className="opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<Trash2 size={12} className="text-red-500" />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</Card>
	);
}
