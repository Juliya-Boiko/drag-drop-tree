import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Header } from './components/header/Header';
import { Category } from './components/category/Category';

const zoomValues: string[] = [
  '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.25', '1.5',
];

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{ startX: number, startY: number, lastX: number, lastY:number }>({ startX: 0, startY: 0, lastX: 0, lastY: 0 });
  const [zoom, setZoom] = useState<string>('1');

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    }

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  }, []);

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;
    const box = boxRef.current;
    coords.current.lastX = box.offsetLeft;
    coords.current.lastY = box.offsetTop;
    box.style.transform = `translateX(-50%) scale(${Number(zoom).toFixed(1)})`;
  }, [zoom]);

  const zoomOut = (): void => {
    const idx = zoomValues.indexOf(zoom);
    const prevElem = zoomValues[idx - 1];
    setZoom(prevElem);
  };

  const zoomIn = (): void => {
    const idx: number = zoomValues.indexOf(zoom);
    const nextElem = zoomValues[idx + 1];
    setZoom(nextElem);
  };

  const zoomCenter = () => {
    if (!boxRef.current || !containerRef.current) return;
    const box = boxRef.current;
    coords.current.lastX = box.offsetLeft;
    coords.current.lastY = box.offsetTop;
    box.style.top = `50%`;
    box.style.left = `50%`;
    box.style.transform = `translateY(-50%) translateX(-50%) scale(${zoom})`;
  };

  return (
    <>
      <Header
        zoom={zoom}
        setZoom={setZoom}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        zoomCenter={zoomCenter}
      />
      
      <main>
        <div ref={containerRef} className="container">
          <div ref={boxRef} className="box">
            <Category />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;