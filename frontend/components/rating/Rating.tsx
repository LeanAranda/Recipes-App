import RatingStars from "./RatingStars";
import type { RatingData } from "@/types/rating-data";

export default function Rating({ ratings }: { ratings: RatingData[] }) {
    if (ratings.length === 0) {
        return <div className="text-gray-500">Aún no hay calificaciones</div>;
    }

    return (
        <>
            <h2 className="text-xl font-bold">Todas las calificaciones</h2>
            <ul className="space-y-4">
                {ratings.map((rating) => (
                    <li key={rating.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center rating-item">
                        <p className="font-semibold">{rating.user.firstName} {rating.user.lastName}</p>
                        <RatingStars score={rating.score} viewOnly={true} />
                    </li>
                ))}
            </ul>
        </>
    );
}