import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../store/slices/uiSlice';
import { ArrowLeft, Trash2, Download, Share2 } from 'lucide-react';
import Button from '../components/UI/Button';
import { supabase } from '../lib/supabase';
import { getUserId } from '../lib/userStorage';

const DesignHistoryPage = () => {
  const dispatch = useDispatch();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDesigns(data || []);
    } catch (error) {
      console.error('Failed to fetch designs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (designId) => {
    if (!window.confirm('Delete this design?')) return;

    try {
      const { error } = await supabase
        .from('designs')
        .delete()
        .eq('id', designId);

      if (error) throw error;
      setDesigns(designs.filter((d) => d.id !== designId));
      setSelectedDesign(null);
    } catch (error) {
      console.error('Failed to delete design:', error);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="pb-24 bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(setActiveTab('home'))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Design History</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 sm:px-6 max-w-3xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading designs...</p>
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No designs yet</p>
            <Button
              variant="primary"
              onClick={() => dispatch(setActiveTab('create'))}
            >
              Create Your First Design
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              {designs.length} design{designs.length !== 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {designs.map((design) => (
                <div
                  key={design.id}
                  onClick={() => setSelectedDesign(design)}
                  className="cursor-pointer group"
                >
                  <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-100 relative h-48">
                    <img
                      src={design.generated_image}
                      alt="Design"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {design.room_type || 'Design'} - {design.style || 'Custom'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(design.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Design Detail Modal */}
      {selectedDesign && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setSelectedDesign(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Design Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                src={selectedDesign.generated_image}
                alt="Design"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Comparison */}
            {selectedDesign.original_image && (
              <div className="space-y-4 mb-6">
                <h3 className="font-bold text-lg text-gray-900">Before & After</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={selectedDesign.original_image}
                      alt="Original"
                      className="w-full h-32 object-cover"
                    />
                    <p className="text-xs font-semibold text-gray-600 text-center py-2">Before</p>
                  </div>
                  <div className="rounded-lg overflow-hidden border-2 border-red-200">
                    <img
                      src={selectedDesign.generated_image}
                      alt="Generated"
                      className="w-full h-32 object-cover"
                    />
                    <p className="text-xs font-semibold text-red-600 text-center py-2">After</p>
                  </div>
                </div>
              </div>
            )}

            {/* Design Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
              <h3 className="font-bold text-gray-900">Design Details</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-600 text-xs">Room</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedDesign.room_type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Style</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedDesign.style || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Palette</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedDesign.palette || 'N/A'}</p>
                </div>
              </div>
              {selectedDesign.prompt && (
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-600 text-xs">Prompt</p>
                  <p className="font-semibold text-gray-900 text-sm mt-1">{selectedDesign.prompt}</p>
                </div>
              )}
              <div className="pt-2 text-xs text-gray-500">
                {new Date(selectedDesign.created_at).toLocaleString()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => handleDownload(selectedDesign.generated_image)}
                  className="flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => handleDelete(selectedDesign.id)}
                  className="flex items-center justify-center gap-2"
                >
                  <Trash2 size={20} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignHistoryPage;
