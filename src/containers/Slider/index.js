import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    // Récupération des données à partir du contexte
    const { data } = useData();
    
    // Déclaration de l'état local pour l'index de la diapositive actuelle
    const [index, setIndex] = useState(0);

    // Tri des événements par date décroissante
    const byDateDesc = data?.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    );

    // Fonction pour passer à la carte suivante après un délai de 5 secondes
    const nextCard = () => {
        setTimeout(
            () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
            5000
        );
    };

    useEffect(() => {
        // Si les données sont disponibles, on appelle nextCard pour démarrer la rotation des cartes
        if (byDateDesc) {
            nextCard();
        }
    }, [byDateDesc, index]); // Dépendances : relancer l'effet si 'byDateDesc' ou 'index' changent
    
    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <article key={event.title}>
                    <div
                        className={`SlideCard SlideCard--${
                            index === idx ? "display" : "hide"
                        }`}
                    >
                        <img src={event.cover} alt="forum" />
                        <div className="SlideCard__descriptionContainer">
                            <div className="SlideCard__description">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div>{getMonth(new Date(event.date))}</div>
                            </div>
                        </div>
                    </div>
                    <div className="SlideCard__paginationContainer">
                        <div className="SlideCard__pagination">
                            {byDateDesc.map((_, radioIdx) => (
                                <input
                                    key={`${radioIdx + 1}`} // Clé unique pour chaque bouton radio
                                    type="radio"
                                    name="radio-button"
                                    checked={index === radioIdx}
                                    readOnly
                                />
                            ))}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Slider;
