'use client'
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Gallery } from 'react-grid-gallery';

type Image = {
  id: number;
  src: string;
  original: string;
  width: number;
  height: number;
  tags: { value: string; title: string }[];
};

const getRandomSize = () => {
  const width = Math.floor(Math.random() * (600 - 300 + 1)) + 300;  // Width between 300px and 600px
  const height = Math.floor(Math.random() * (400 - 200 + 1)) + 200; // Height between 200px and 400px
  return { width, height };
};

const allTags = ['#Nature', '#Cityscape', '#Animals'];

const getRandomTags = () => {
  const randomCount = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

  const shuffledTags = allTags.sort(() => 0.5 - Math.random());

  const selectedTags = shuffledTags.slice(0, randomCount);

  const randomTags = selectedTags.map((tag) => ({ value: tag, title: tag }));

  return randomTags;
};


const GalleryComponent: React.FC = () => {
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchImages = async () => {
    const newImages: Image[] = Array.from({ length: 30 }, (_, i) => {
      const { width, height } = getRandomSize();
      return {
        id: i + (page - 1) * 10,
        src: `https://placehold.co/${width}x${height}?text=Image+${i + (page - 1) * 10}`,
        original: `https://placehold.co/${width}x${height}?text=Image+${i + (page - 1) * 10}`,
        width: width,
        height: height,
        tags: getRandomTags(),
      };
    });

    setAllImages((prevImages) => [...prevImages, ...newImages]);

    if (selectedTag) {
      setFilteredImages((prevFiltered) =>
        [...prevFiltered, ...newImages].filter((img) => img.tags.some((tag) => tag.value === selectedTag))
      );
    } else {
      setFilteredImages((prevFiltered) => [...prevFiltered, ...newImages]);
    }

    setHasMore(newImages.length > 0);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      const filtered = allImages.filter((img) => img.tags.some((tag) => tag.value === selectedTag));
      setFilteredImages(filtered);
    } else {
      setFilteredImages(allImages);
    }
  }, [selectedTag, allImages]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  return (
    <div>
      <h3>Hashtags:</h3>
      {allTags.map((tag, index) => (
        <button key={index} onClick={() => handleTagClick(tag)}>
          {tag}
        </button>
      ))}
      {selectedTag && (
        <div>
          <p>
            Filtering by: <strong>{selectedTag}</strong>
          </p>
        </div>
      )}
      <InfiniteScroll
        dataLength={allImages.length}
        next={fetchImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more images to show.</p>}
      >
        <Gallery
          images={filteredImages.map((img) => ({
            src: img.src,
            original: img.original,
            width: img.width,
            height: img.height,
            tags: img.tags
          }))}
          enableImageSelection={false}
        />
      </InfiniteScroll>
    </div>
  );
};

export default GalleryComponent;
