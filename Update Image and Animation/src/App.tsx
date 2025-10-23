import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import huttRoadImage from 'figma:asset/ec99d405b73608261bf2990b82c61e46b9adbc5d.png';
import roadViewMap from 'figma:asset/c168f98dd62d458e83f299e7da73adddd058ace9.png';
import networkViewMap from 'figma:asset/7e01d5cc448a22a84fee844890c5b1de4d4eb14a.png';
import { SlopeChart } from './components/SlopeChart';

type TabType = 'Charts' | 'Details' | 'QA';
type MapView = 'network' | 'road';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Charts');
  const [mapView, setMapView] = useState<MapView>('network');
  const tabs: TabType[] = ['Charts', 'Details', 'QA'];

  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.indexOf(current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 1200); // Switch every 1.2 seconds

    // Slower map switching - every 2.4 seconds (every 2 tab cycles)
    const mapInterval = setInterval(() => {
      setMapView((current) => current === 'network' ? 'road' : 'network');
    }, 2400);

    return () => {
      clearInterval(tabInterval);
      clearInterval(mapInterval);
    };
  }, []);

  const tabContent = {
    Charts: (
      <div className="w-full">
        <SlopeChart />
      </div>
    ),
    Details: (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mt-0.5">
            <span className="text-blue-600">📍</span>
          </div>
          <div>
            <p>Location: Your Road</p>
            <p className="text-gray-600 mt-1">5m distance</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mt-0.5">
            <span className="text-blue-600">🌐</span>
          </div>
          <div>
            <p>Coordinates: -41.2148125+174.8857178+20.01/</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mt-0.5">
            <span className="text-blue-600">📅</span>
          </div>
          <div>
            <p>16th Sept 2025, 2:56 PM</p>
          </div>
        </div>
      </div>
    ),
    QA: (
      <div className="space-y-4">
        <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r">
          <p>Status: Quality Assured</p>
          <p className="text-gray-600 mt-1">All checks passed</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white">✓</span>
            </div>
            <p>Data validation complete</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white">✓</span>
            </div>
            <p>Accuracy verified</p>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-8" style={{ perspective: '2000px' }}>
      <div className="relative w-[600px] h-[600px]" style={{ transform: 'rotateY(-15deg) rotateX(5deg)', transformStyle: 'preserve-3d' }}>
        {/* Background Map - square */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative w-full h-full">
            <AnimatePresence initial={false}>
              <motion.img
                key={mapView}
                src={mapView === 'network' ? networkViewMap : roadViewMap}
                alt={mapView === 'network' ? 'Network View' : 'Road View'}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>
        
        {/* Data Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 w-[400px] mx-auto mt-20"
        >
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b flex items-center justify-between">
              <h2 className="text-gray-900">Data</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Title */}
            <div className="px-4 pt-4 pb-3">
              <h3 className="text-gray-900">Your Road</h3>
            </div>

            {/* Info Row */}
            <div className="px-4 pb-3 flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-xs">📏</span>
                <span className="text-sm">5m</span>
              </div>
              <div className="text-sm">
                🌐 -41.2148125+174.8857178+20.01/
              </div>
            </div>

            <div className="px-4 pb-4 text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-xs">📅</span>
                <span className="text-sm">16th Sept 2025, 2:56 PM</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4">
              <div className="flex gap-2 border-b">
                {(['Charts', 'Details', 'QA'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative px-4 py-2 transition-colors"
                  >
                    <span
                      className={`relative z-10 text-sm transition-colors ${
                        activeTab === tab
                          ? 'text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </span>
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-50 rounded-t-lg"
                        transition={{ type: 'spring', bounce: 0, duration: 0.4, ease: 'easeInOut' }}
                      />
                    )}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabBorder"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        transition={{ type: 'spring', bounce: 0, duration: 0.4, ease: 'easeInOut' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 py-4 h-[280px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="h-full"
                >
                  {tabContent[activeTab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
