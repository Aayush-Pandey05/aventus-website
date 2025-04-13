import { useEffect, useRef, useState } from "react";
import "./css/PrizePodium.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";

export default function PrizePodium() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const specialsRef = useRef(null);

  const specialPrizes = [
    {
      title: "SDG Innovators",
      aventus_amount: "₹10,000",
      description:
        "Awarded to the team that took on real-world challenges and said, 'We’ve got this' — while aligning beautifully with the UN’s Sustainable Development Goals.",
      icon: <FontAwesomeIcon icon={faEarthAmericas} size="2x" color="#00ff2a" />,
      position: "left",
    },
    {
      title: "Women\nin Tech",
      aventus_amount: "₹10,000",
      description:
        "For the brilliant women who led from the front, broke barriers, wrote powerful code, and proved tech has no gender — just genius.",
      icon: (
        <img
          src="/happy.png"
          alt="Women in Tech"
        />
      ),
      position: "center",
    },
    {
      title: "Most Innovative Solution",
      aventus_amount: "₹10,000",
      description:
        "For the wild idea that made us say, 'Wait... can they actually do that?' You pushed the limits, and then casually rewrote them.",
      icon: <FontAwesomeIcon icon={faLightbulb} size="2x" color="#00ff2a" />,
      position: "right",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (specialsRef.current) {
      observer.observe(specialsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div className="prize-wrapper">
      <h2 className="section-title">Special Category Awards</h2>

      <div className="specials" ref={specialsRef}>
        {specialPrizes.map((prize, index) => (
          <div
            key={prize.title}
            className={`special-card ${prize.position} ${
              hasAnimated ? `animate delay-${index + 1}` : ""
            }`}
          >
            <div className="emoji-wrapper">
              <div className="emoji shine-icon">{prize.icon}</div>
            </div>

            <h4 className="title">
              {prize.title.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </h4>

            <p className="aventus-amount">{prize.aventus_amount}</p>
            <p className="description">{prize.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
