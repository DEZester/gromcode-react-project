import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import { createEvent } from '../../gateway/gateway';

const Modal = ({ showModalMenu, fetchEventsList }) => {
  const [formDatas, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formDatas, [name]: value });
  };

  const handleAddTask = e => {
    e.preventDefault();
    const { title, description, date, startTime, endTime } = formDatas;
    const newEvent = {
      title,
      dateFrom: new Date(new Date(`${date} ${startTime}`).getTime()),
      dateTo: new Date(new Date(`${date} ${endTime}`).getTime()),
      description,
    };

    createEvent(newEvent).then(fetchEventsList);
    showModalMenu();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={showModalMenu}>
            +
          </button>
          <form className="event-form" onSubmit={handleAddTask}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              className="event-form__field"
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  showModalMenu: PropTypes.func,
  createEvent: PropTypes.func,
};
