"use client";

import { useState, useEffect } from "react";
import { CollectionManager } from "@/components/collection-manager";
import { DishPicker } from "@/components/dish-picker";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
	getDefaultLanguage,
	translate,
	type Language,
} from "@/lib/translations";

export default function Home() {
	const [collections, setCollections] = useState<Record<string, string[]>>({});
	const [selectedCollection, setSelectedCollection] =
		useState<string>("default");
	const [isLoading, setIsLoading] = useState(true);
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		setLanguage(getDefaultLanguage());

		const saved = localStorage.getItem("mealCollections");
		if (saved) {
			try {
				const parsed = JSON.parse(saved);
				setCollections(parsed);
			} catch {
				setCollections({ default: getDefaultDishes() });
			}
		} else {
			setCollections({ default: getDefaultDishes() });
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("mealCollections", JSON.stringify(collections));
		}
	}, [collections, isLoading]);

	const handleCollectionsChange = (
		newCollections: Record<string, string[]>,
	) => {
		setCollections(newCollections);
		if (
			!newCollections[selectedCollection] &&
			Object.keys(newCollections).length > 0
		) {
			setSelectedCollection(Object.keys(newCollections)[0]);
		}
	};

	if (isLoading) {
		return (
			<main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 flex items-center justify-center">
				<p className="text-muted-foreground">Loading...</p>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10 overflow-hidden">
			{/* Decorative food icons - top */}
			<div className="fixed top-8 right-12 text-5xl opacity-20 animate-bounce-gentle pointer-events-none">
				🥕
			</div>
			<div className="fixed top-20 left-10 text-6xl opacity-15 animate-pulse-soft pointer-events-none">
				🥑
			</div>
			<div
				className="fixed top-40 right-20 text-4xl opacity-20 animate-bounce-gentle pointer-events-none"
				style={{ animationDelay: "0.5s" }}
			>
				🍎
			</div>

			{/* Language switcher */}
			<div className="fixed top-4 right-4 z-20">
				<LanguageSwitcher language={language} onLanguageChange={setLanguage} />
			</div>

			{/* Main content */}
			<div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 mt-6 md:mt-0">
				<div className="w-full max-w-4xl">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-9">
							{language === "vi" ? "Ăn Gì Bây Giờ?" : "What to Eat?"}
						</h1>
						<p className="text-lg text-muted-foreground font-sans">
							{language === "vi"
								? "Không biết ăn gì? Tạo bộ sưu tập riêng của bạn hoặc chọn từ danh sách mặc định!"
								: "Can't decide? Create your own meal collections or pick from the default list!"}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 order-first lg:order-none">
						{/* Meal picker - appears first on mobile */}
						<div className="lg:col-span-2 lg:order-last">
							<DishPicker
								dishes={collections[selectedCollection] || []}
								collectionName={selectedCollection}
								language={language}
							/>
						</div>

						{/* Collections manager - appears below on mobile */}
						<div className="lg:order-first">
							<CollectionManager
								collections={collections}
								onCollectionsChange={handleCollectionsChange}
								selectedCollection={selectedCollection}
								onSelectCollection={setSelectedCollection}
								language={language}
							/>
						</div>
					</div>

					{/* Footer */}
					<footer className="mt-12 pt-6 border-t border-border/50">
						<div className="text-center text-sm text-muted-foreground">
							<p>
								{translate(language, "designedBy")}{" "}
								<span className="font-medium text-foreground">thuannc</span>
							</p>
							<p className="mt-1">{translate(language, "licensedUnder")}</p>
						</div>
					</footer>
				</div>
			</div>

			{/* Decorative food icons - bottom */}
			<div className="fixed bottom-20 left-16 text-6xl opacity-15 animate-pulse-soft pointer-events-none">
				🥬
			</div>
			<div
				className="fixed bottom-10 right-12 text-5xl opacity-20 animate-bounce-gentle pointer-events-none"
				style={{ animationDelay: "0.3s" }}
			>
				🥕
			</div>
			<div className="fixed bottom-32 right-1/4 text-4xl opacity-10 animate-bounce-gentle pointer-events-none">
				🍊
			</div>
		</main>
	);
}

function getDefaultDishes(): string[] {
	return [
		"Gà (Texas, Joulibee, Lotte…)",
		"Mì ý gà giòn sốt kem",
		"Pizza",
		"Pasta",
		"Sushi + kimbap",
		"Đồ hàn quốc (bibimbap...)",
		"Đồ nướng",
		"Mì cay",
		"Bún cá sứa nha trang - lê hồng phong",
		"Cơm sườn trứng",
		"Bún cay thái",
		"Bánh căn",
		"Hamberger",
		"Beef steak",
		"Đồ chiên",
		"Hột vịt - trứng cút lộn",
		"Sinh tố bơ, dừa (sapoche)",
		"Kem",
		"Bánh tart trứng, tiramisu, bông lan trứng muối, crepe sầu riêng,...nhiều loại bánh",
		"Ăn trái cây tô sữa chua",
		"Bingsu",
		"Nem chua rán",
		"Bánh mì ốp la hoặc bánh mì thịt chả, bánh mì cóc gà xé nhưng ăn chỉ cảm thấy ngon nhất khi cho nhiều pate và bơ và tương ớt",
		"Bún đậu mắm tôm",
		"Bánh bèo tôm thịt miền trung",
		"Bánh xèo miền trung nhưng chỉ thích bỏ thịt thôiii",
		"Phở tái bò viên",
		"Lẩu :3 lẩu nấm, lẩu thái, lẩu kim châm, lẩu cá, lẩu tokkboki",
		"Chè thái, chè bưởi , chè các loại,…",
		"Bánh flann",
		"Vịt quay nạc. Chú ý là nạc nha",
		"Thịt nai né",
		"Hủ tiếu tàu",
		"Bánh tráng nướng, da heo chiên giòn",
		"Bún bò vói bò tái và chả",
		"Nui xào bò",
		"Mực chiên giòn",
		"Cơm tấm sườn bì chả",
		"Cơm gà Hội An",
		"Cơm chiên Dương Châu",
		"Cơm rang kim chi",
		"Cơm sườn trứng",
		"Cơm bò xào lúc lắc",
		"Cơm gà xối mỡ",
		"Bún riêu cua",
		"Bún bò Huế",
		"Bún chả Hà Nội",
		"Bún đậu mắm tôm",
		"Bún cay Thái",
		"Bún cá sứa Nha Trang",
		"Bún thịt nướng",
		"Phở bò tái, bò viên",
		"Phở gà",
		"Hủ tiếu Nam Vang",
		"Cháo lòng",
		"Cháo gà",
		"Cháo vịt",
		"Cháo lươn",
		"Miến lươn",
		"Mì quảng",
		"Mì cay",
		"Mì Ý sốt bò bằm",
		"Mì Ý gà giòn sốt kem",
		"Mì xào hải sản",
		"Mì xào bò",
		"Bánh mì ốp la",
		"Bánh mì thịt nướng",
		"Bánh mì heo quay",
		"Bánh cuốn thịt nướng",
		"Bánh bèo chén",
		"Bánh bột lọc",
		"Bánh căn",
		"Bánh xèo miền Trung",
		"Bánh khọt",
		"Xôi mặn",
		"Xôi gà",
		"Xôi xéo Hà Nội",
		"Bánh giò",
		"Bánh bao nhân thịt",
		"Nem lụi",
		"Gỏi cuốn tôm thịt",
		"Chả giò rế",
		"Gà rán (Texas, Jollibee, Lotte…)",
		"Gà nướng mật ong",
		"Gà kho gừng",
		"Tôm rang thịt ba chỉ",
		"Cá thu sốt cà",
		"Cá kho tộ",
		"Cá chiên xù",
		"Lẩu gà lá giang",
		"Lẩu bò nhúng giấm",
		"Lẩu mắm",
		"Lẩu Thái",
		"Lẩu hải sản",
		"Lẩu cá kèo",
		"Bánh tráng nướng (ăn kèm thịt và rau)",
		"Đồ nướng (BBQ, thịt xiên nướng)",
		"Bò né",
		"Bò bít tết",
		"Thịt nai né",
		"Thịt ba chỉ cuốn rau sống",
		"Đùi gà quay nướng",
		"Thịt vịt nướng/luộc",
		"Cá hồi áp chảo",
		"Cơm niêu cá kho",
		"Cơm lam gà nướng",
		"Thịt kho trứng (thịt kho tàu)",
		"Canh chua cá lóc kèm cơm",
		"Gỏi gà lá chanh",
		"Chân giò hầm",
		"Đậu hũ nhồi thịt sốt cà",
		"Canh khổ qua nhồi thịt",
		"Tôm hấp bia kèm cơm",
		"Bánh cuốn chả lụa",
		"Xíu mại chén ăn kèm bánh mì",
		"Pizza (thịt, hải sản, phô mai)",
		"Pasta sốt kem hải sản",
		"Sushi cuộn (ăn no với cơm giấm và nhân)",
		"Kimbap kèm thịt nướng",
		"Bibimbap (cơm trộn Hàn Quốc)",
		"Tokbokki phô mai",
		"Mì lạnh Hàn Quốc",
		"Cơm chiên cá mặn",
		"Lẩu tokbokki thập cẩm",
		"Lẩu kim chi",
		"Mực chiên giòn kèm cơm",
		"Mì xào thập cẩm",
		"Bánh hỏi thịt nướng",
		"Cháo sườn",
		"Xôi chiên phồng kèm gà nướng",
		"Nem nướng Nha Trang",
		"Bún thịt xào sả ớt",
		"Bánh mì kẹp chả",
		"Xôi gấc kèm gà luộc",
		"Canh cua mồng tơi ăn với cơm",
		"Lẩu đuôi bò",
		"Canh bí đỏ nấu tôm ăn với cơm",
	];
}
