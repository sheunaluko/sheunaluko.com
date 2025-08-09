import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const PortfolioContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
`;

const MenuButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  font-family: 'Arial', sans-serif;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? '0' : '-300px')};
  width: 300px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 999;
  transition: left 0.3s ease;
  padding: 80px 20px 20px;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: white;
  padding: 15px 0;
  font-size: 18px;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #333;
  font-family: 'Arial', sans-serif;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: #ccc;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  cursor: pointer;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 20px;
  font-size: 24px;
  cursor: pointer;
  z-index: 100;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`;

const ShootTitle = styled.h1`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 5px;
`;

const ImageCounter = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 15px;
  border-radius: 5px;
  z-index: 100;
`;

export default function Portfolio() {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "photos" } }) {
        nodes {
          relativePath
          publicURL
          name
          relativeDirectory
        }
      }
    }
  `);

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentShoot, setCurrentShoot] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Organize images by shoot
  const shoots = {};
  data.allFile.nodes.forEach((node) => {
    const shootName = node.relativeDirectory;
    if (!shoots[shootName]) {
      shoots[shootName] = [];
    }
    shoots[shootName].push(node);
  });

  // Sort images in each shoot
  Object.keys(shoots).forEach((shootName) => {
    shoots[shootName].sort((a, b) => a.name.localeCompare(b.name));
  });

  const shootNames = Object.keys(shoots).sort();

  // Initialize with first shoot
  useEffect(() => {
    if (shootNames.length > 0 && !currentShoot) {
      setCurrentShoot(shootNames[0]);
    }
  }, [shootNames, currentShoot]);

  const currentImages = shoots[currentShoot] || [];

  // Preload images function
  const preloadImages = (imageUrls) => {
    imageUrls.forEach((url) => {
      if (!preloadedImages.has(url)) {
        const img = new Image();
        img.src = url;
        setPreloadedImages((prev) => new Set([...prev, url]));
      }
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1,
    );
  };

  const selectShoot = (shootName) => {
    setCurrentShoot(shootName);
    setCurrentImageIndex(0);
    setMenuOpen(false);
  };

  // Preload next three images when current image or shoot changes
  useEffect(() => {
    if (currentImages.length > 0) {
      const imagesToPreload = [];

      // Get next three images in sequence, handling wrap-around
      for (let i = 1; i <= 3; i++) {
        const nextIndex =
          (currentImageIndex + i) % currentImages.length;
        const nextImage = currentImages[nextIndex];
        if (nextImage && nextImage.publicURL) {
          imagesToPreload.push(nextImage.publicURL);
        }
      }

      if (imagesToPreload.length > 0) {
        preloadImages(imagesToPreload);
      }
    }
  }, [currentImageIndex, currentShoot, currentImages]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () =>
      window.removeEventListener('keydown', handleKeyPress);
  }, [currentImages.length]);

  if (shootNames.length === 0) {
    return <div>No photos found</div>;
  }

  const currentImage = currentImages[currentImageIndex];

  return (
    <PortfolioContainer>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        ☰ SHOOTS
      </MenuButton>

      <Menu isOpen={menuOpen}>
        {shootNames.map((shootName) => (
          <MenuItem
            key={shootName}
            className={shootName === currentShoot ? 'active' : ''}
            onClick={() => selectShoot(shootName)}
          >
            {shootName.replace(/_/g, ' ')}
          </MenuItem>
        ))}
      </Menu>

      {currentImage && (
        <CarouselContainer>
          <NavButton className="prev" onClick={prevImage}>
            ‹
          </NavButton>
          <Image
            src={currentImage.publicURL}
            alt={`${currentShoot} ${currentImageIndex + 1}`}
            onClick={nextImage}
          />
          <NavButton className="next" onClick={nextImage}>
            ›
          </NavButton>
        </CarouselContainer>
      )}

      <ShootTitle>{currentShoot.replace(/_/g, ' ')}</ShootTitle>

      <ImageCounter>
        {currentImageIndex + 1} / {currentImages.length}
      </ImageCounter>
    </PortfolioContainer>
  );
}
