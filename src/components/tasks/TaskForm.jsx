import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { Calendar, Type, AlignLeft, Zap } from 'lucide-react';

const CATEGORIES = [
  { id: 'Design', label: '🎨 Design' },
  { id: 'Dev', label: '⚡ Dev' },
  { id: 'Strategy', label: '💼 Strategy' },
  { id: 'Life', label: '🌱 Life' },
];

const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'var(--color-lime)' },
  { id: 'medium', label: 'Medium', color: 'var(--color-yellow)' },
  { id: 'high', label: 'High', color: 'var(--color-coral)' },
];

export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    category: 'Design',
    priority: 'medium',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        due_date: initialData.due_date || '',
        category: initialData.category || 'Design',
        priority: initialData.priority || 'medium',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        due_date: '',
        category: 'Design',
        priority: 'medium',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      due_date: formData.due_date,
      category: formData.category,
      priority: formData.priority,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Zap size={20} className="text-yellow" />
          {isEditing ? 'EDIT TASK' : 'CREATE NEW TASK'}
        </span>
      }
      subtitle={isEditing ? 'Update your task details below' : 'Add a new task to your workspace'}
      maxWidth="560px"
      footer={
        <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
          >
            {isEditing ? 'Save Changes' : '+ Create Task'}
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }} noValidate>
        {/* Title */}
        <Input
          label="Task Title"
          id="task-title"
          name="title"
          placeholder="e.g. Finalize Neo-Brutalist Design Tokens"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          leftIcon={<Type size={18} />}
          required
          autoFocus
        />

        {/* Description */}
        <Input
          label="Task Description (Optional)"
          id="task-description"
          name="description"
          multiline
          rows={3}
          placeholder="Add details, acceptance criteria, or links..."
          value={formData.description}
          onChange={handleChange}
          leftIcon={<AlignLeft size={18} />}
        />

        {/* Due Date & Priority Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Due Date"
            id="task-due-date"
            name="due_date"
            type="date"
            value={formData.due_date}
            onChange={handleChange}
            leftIcon={<Calendar size={18} />}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label className="neo-input-label">Priority</label>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {PRIORITIES.map((p) => {
                const isSelected = formData.priority === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className="modal-pill-btn"
                    style={{
                      flex: 1,
                      backgroundColor: isSelected ? p.color : 'var(--color-white)',
                      boxShadow: isSelected ? '2px 2px 0px var(--color-border)' : 'none',
                    }}
                    onClick={() => setFormData((prev) => ({ ...prev, priority: p.id }))}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label className="neo-input-label">Category</label>
          <div className="modal-pill-group">
            {CATEGORIES.map((c) => {
              const isSelected = formData.category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`modal-pill-btn ${isSelected ? 'modal-pill-btn--selected' : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, category: c.id }))}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </form>
    </Modal>
  );
}
