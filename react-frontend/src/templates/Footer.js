import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <footer>
            <span>Feito com <FontAwesomeIcon icon={faHeart} className="text-danger" /> por Frank L X Rocha</span>
        </footer>
    )
}
