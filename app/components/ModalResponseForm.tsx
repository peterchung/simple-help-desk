'use client';

export default function ModalResponseForm({ isOpen, onDismiss, ticket }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onDismiss}
      className='fixed w-screen h-screen bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className='min-w-[600px] max-w-full overflow-x-hidden min-h-[800px] bg-white rounded-xl p-2 flex flex-col relative'
      >
        <div>
          <header>Ticket #</header>
        </div>
        <form>Modal data</form>
      </div>
    </div>
  );
}
