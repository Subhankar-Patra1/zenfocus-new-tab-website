import React, { useState, useRef, useEffect } from 'react';

const GoogleAppsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div 
        ref={buttonRef}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 cursor-pointer transition-colors group relative"
        onClick={toggleMenu}
        title="Google Apps"
      >
        <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
        </svg>
      </div>

      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute top-12 right-0 w-[320px] max-h-[460px] overflow-y-auto bg-[#202124]/40 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-4 z-50 animate-in fade-in zoom-in-95 duration-200 custom-scrollbar"
          style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            <AppIcon href="https://myaccount.google.com/" label="Account" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-1.74 0-3.34-.56-4.65-1.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5m6.14-2.88a9.95 9.95 0 0 0-12.28 0A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12"></path>
                    <path fill="currentColor" d="M12 5.93c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5s-1.57-3.5-3.5-3.5m0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"></path>
                </svg>
            } />
            <AppIcon href="https://google.com/" label="Search" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-2 -2 24 24">
                    <path fill="currentColor" d="M4.376 8.068A6 6 0 0 0 4.056 10c0 .734.132 1.437.376 2.086a5.946 5.946 0 0 0 8.57 3.045h.001a5.96 5.96 0 0 0 2.564-3.043H10.22V8.132h9.605a10 10 0 0 1-.044 3.956a10 10 0 0 1-3.52 5.71A9.96 9.96 0 0 1 10 20A9.998 9.998 0 0 1 1.118 5.401A10 10 0 0 1 10 0c2.426 0 4.651.864 6.383 2.302l-3.24 2.652a5.948 5.948 0 0 0-8.767 3.114"></path>
                </svg>
            } />
            <AppIcon href="https://www.youtube.com/" label="YouTube" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="1 0 24 24">
                    <g fill="none" fillRule="evenodd">
                        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                        <path fill="currentColor" d="M12 4c.855 0 1.732.022 2.582.058l1.004.048l.961.057l.9.061l.822.064a3.8 3.8 0 0 1 3.494 3.423l.04.425l.075.91c.07.943.122 1.971.122 2.954s-.052 2.011-.122 2.954l-.075.91l-.04.425a3.8 3.8 0 0 1-3.495 3.423l-.82.063l-.9.062l-.962.057l-1.004.048A62 62 0 0 1 12 20a62 62 0 0 1-2.582-.058l-1.004-.048l-.961-.057l-.9-.062l-.822-.063a3.8 3.8 0 0 1-3.494-3.423l-.04-.425l-.075-.91A41 41 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91l.04-.425A3.8 3.8 0 0 1 5.73 4.288l.821-.064l.9-.061l.962-.057l1.004-.048A62 62 0 0 1 12 4m-2 5.575v4.85c0 .462.5.75.9.52l4.2-2.425a.6.6 0 0 0 0-1.04l-4.2-2.424a.6.6 0 0 0-.9.52Z"></path>
                    </g>
                </svg>
            } />
            <AppIcon href="https://mail.google.com/" label="Gmail" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="1 0 24 24">
                    <path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"></path>
                </svg>
            } />
            <AppIcon href="https://music.youtube.com/" label="YTMusic" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                        <path d="M8.217 8.286C9.265 7.254 10.514 6.743 12 6.743s2.735.51 3.783 1.543s1.562 2.258 1.562 3.714s-.514 2.68-1.562 3.713s-2.297 1.543-3.783 1.543s-2.735-.51-3.783-1.543S6.655 13.455 6.655 12s.514-2.682 1.562-3.714m6.977 3.715L10 14.91V9.088z"></path>
                        <path d="M19.071 18.966Q22.001 16.08 22 12q0-4.081-2.929-6.967Q16.141 2.147 12 2.147T4.929 5.033T2 12q0 4.08 2.929 6.966q2.93 2.886 7.071 2.886q4.142 0 7.071-2.886M12 5.433c-1.827 0-3.407.644-4.702 1.92C6.002 8.63 5.345 10.19 5.345 12c0 1.809.657 3.37 1.953 4.646c1.295 1.276 2.874 1.92 4.702 1.92s3.407-.644 4.702-1.92c1.296-1.276 1.953-2.837 1.953-4.646c0-1.81-.657-3.37-1.953-4.647c-1.295-1.276-2.875-1.92-4.702-1.92"></path>
                    </g>
                </svg>
            } />
            <AppIcon href="https://maps.google.com/" label="Maps" icon={
                <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M4.456 12.367c-.515-1.143-.829-2.42-.83-3.994.001-2.05.739-3.927 1.962-5.383A8.354 8.354 0 0 1 12 0c.882 0 1.732.137 2.53.39a8.393 8.393 0 0 1 4.9 4.124c-.006.008 0 0 0 0a8.334 8.334 0 0 1 .943 3.859c0 5.078-3.256 7.061-6.05 11.429C12.625 22.426 13.096 24 12 24c-1.096 0-.625-1.574-2.323-4.198-1.955-3.058-4.057-4.854-5.221-7.435Zm5.096-6.059-.008.01a3.202 3.202 0 0 0 4.893 4.133l.03-.035a3.202 3.202 0 0 0-4.915-4.107z"></path>
                </svg>
            } />
            <AppIcon href="https://play.google.com/" label="Play" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"></path>
                </svg>
            } />
            <AppIcon href="https://drive.google.com/" label="Drive" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z"></path>
                </svg>
            } />
            <AppIcon href="https://photos.google.com/" label="Photos" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256">
                    <g fill="currentColor">
                        <path d="M192 88a63.7 63.7 0 0 1-14 40h-50V24a64 64 0 0 1 64 64M64 168a64 64 0 0 0 64 64V128H78a63.7 63.7 0 0 0-14 40" opacity=".2"></path>
                        <path d="M232 120h-39.51A72 72 0 0 0 128 16a8 8 0 0 0-8 8v39.51A72 72 0 0 0 16 128a8 8 0 0 0 8 8h39.51A72 72 0 0 0 128 240a8 8 0 0 0 8-8v-39.51A72 72 0 0 0 240 128a8 8 0 0 0-8-8M120 223.43A56.09 56.09 0 0 1 72 168a55.3 55.3 0 0 1 10-32h38ZM120 120H32.57A56.09 56.09 0 0 1 88 72a55.3 55.3 0 0 1 32 10Zm16-87.43A56.09 56.09 0 0 1 184 88a55.3 55.3 0 0 1-10 32h-38ZM168 184a55.3 55.3 0 0 1-32-10v-38h87.43A56.09 56.09 0 0 1 168 184"></path>
                    </g>
                </svg>
            } />
            <AppIcon href="https://translate.google.com/" label="Translate" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m12 22-1-3H4q-.825 0-1.412-.587T2 17V4q0-.825.588-1.412T4 2h6l.875 3H20q.875 0 1.438.563T22 7v13q0 .825-.562 1.413T20 22zm-4.85-7.4q1.725 0 2.838-1.112T11.1 10.6q0-.2-.012-.362t-.063-.338h-3.95v1.55H9.3q-.2.7-.763 1.088t-1.362.387q-.975 0-1.675-.7T4.8 10.5t.7-1.725 1.675-.7q.45 0 .85.163t.725.487L9.975 7.55Q9.45 7 8.712 6.7T7.15 6.4q-1.675 0-2.863 1.188T3.1 10.5t1.188 2.913T7.15 14.6m6.7.5.55-.525q-.35-.425-.637-.825t-.563-.85zm1.25-1.275q.7-.825 1.063-1.575t.487-1.175h-3.975l.3 1.05h1q.2.375.475.813t.65.887M13 21h7q.45 0 .725-.288T21 20V7q0-.45-.275-.725T20 6h-8.825l1.175 4.05h1.975V9h1.025v1.05H19v1.025h-1.275q-.25.95-.75 1.85T15.8 14.6l2.725 2.675L17.8 18l-2.7-2.7-.9.925L15 19z"></path>
                </svg>
            } />
            <AppIcon href="https://calendar.google.com/" label="Calendar" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.316 5.684H24v12.632h-5.684zM5.684 24h12.632v-5.684H5.684zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684zm-7.207 6.25v-.065q.407-.216.687-.617c.28-.401.279-.595.279-.982q0-.568-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.7 2.7 0 0 0-1.197-.257q-.9 0-1.481.467-.579.467-.793 1.078l1.085.452q.13-.374.413-.633.284-.258.767-.257.495 0 .816.264a.86.86 0 0 1 .322.703q0 .495-.36.778t-.886.284h-.567v1.085h.633q.611 0 1.02.327.407.327.407.843 0 .505-.387.832c-.387.327-.565.327-.924.327q-.527 0-.897-.311-.372-.312-.521-.881l-1.096.452q.268.923.977 1.401.707.479 1.538.477a2.84 2.84 0 0 0 1.293-.291q.574-.29.902-.794.327-.505.327-1.149 0-.643-.344-1.105a2.07 2.07 0 0 0-.881-.689m2.093-1.931.602.913L15 10.045v5.744h1.187V8.446h-.827zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0m-3.289 23.5 4.684-4.684h-4.684zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0z"></path>
                </svg>
            } />
            <AppIcon href="https://meet.google.com/" label="Meet" icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40" height="40">
                    <path fill="currentColor" d="M2 18L2 32 12 32 12 18zM39 9v4.31l-10 9V16H14V6h22C37.66 6 39 7.34 39 9zM29 27.69l10 9V41c0 1.66-1.34 3-3 3H14V34h15V27.69zM12 34v10H5c-1.657 0-3-1.343-3-3v-7H12zM12 6L12 16 2 16zM29 25L39 16 39 34zM49 9.25v31.5c0 .87-1.03 1.33-1.67.75L41 35.8V14.2l6.33-5.7C47.97 7.92 49 8.38 49 9.25z"></path>
                </svg>
            } />
            
            <div className="col-span-3 h-[1px] bg-gray-700 my-2"></div>

            <AppIcon href="https://docs.google.com/document/" label="Docs" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727zm-.545 10.455H7.09v-1.364h7.09v1.364zm2.727-3.273H7.091v-1.364h9.818zm0-3.273H7.091V9.273h9.818zM14.727 6h6l-6-6z"></path>
                </svg>
            } />
            <AppIcon href="https://docs.google.com/spreadsheets/" label="Sheets" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6zm1.363 10.636h-3.41v1.91h3.41zm0 3.273h-3.41v1.91h3.41zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"></path>
                </svg>
            } />
            <AppIcon href="https://docs.google.com/presentation/" label="Slides" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16.09 15.273H7.91v-4.637h8.18zm1.728-8.523h2.91v15.614c0 .904-.733 1.636-1.637 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.068v6.75zm-.363 2.523H6.545v7.363h10.91zm-2.728-5.979V6h6.001l-6-6v3.294z"></path>
                </svg>
            } />
            <AppIcon href="https://news.google.com/" label="News" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21.267 21.2a.614.614 0 0 1-.613.613H3.344a.614.614 0 0 1-.612-.613V8.115a.614.614 0 0 1 .613-.613h17.309a.614.614 0 0 1 .613.613zm-3.032-3.42v-1.195a.08.08 0 0 0-.08-.08h-5.373v1.361h5.373a.08.08 0 0 0 .08-.083zm.817-2.587v-1.201a.08.08 0 0 0-.079-.082h-6.19v1.362h6.189a.08.08 0 0 0 .08-.078v-.004zm-.817-2.588V11.4a.08.08 0 0 0-.08-.08h-5.373v1.361h5.373a.08.08 0 0 0 .08-.079zM8.15 14.045v1.226h1.77c-.145.748-.804 1.292-1.77 1.292a1.976 1.976 0 0 1 0-3.95 1.77 1.77 0 0 1 1.253.49l.934-.932a3.14 3.14 0 0 0-2.187-.853 3.268 3.268 0 1 0 0 6.537c1.89 0 3.133-1.328 3.133-3.197a4 4 0 0 0-.052-.619zM2.27 7.654a.616.616 0 0 1 .613-.613h12.154l-1.269-3.49a.595.595 0 0 0-.743-.383L.368 7.775a.594.594 0 0 0-.323.775l2.225 6.112za.616.616 0 0 1 .613-.613h12.154l-1.269-3.49a.595.595 0 0 0-.743-.383L.368 7.775a.594.594 0 0 0-.323.775l2.225 6.112zm21.312-.31-8.803-2.37.751 2.067h5.584a.614.614 0 0 1 .613.613v8.794l2.247-8.365a.59.59 0 0 0-.392-.74m-4.496-1.675V2.795a.61.61 0 0 0-.611-.608H5.524a.61.61 0 0 0-.616.605v2.837l8.39-3.052a.594.594 0 0 1 .743.39l.544 1.497z"></path>
                </svg>
            } />
            <AppIcon href="https://chat.google.com/" label="Chat" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M1.637 0C.733 0 0 .733 0 1.637v16.5c0 .904.733 1.636 1.637 1.636h3.955v3.323c0 .804.97 1.207 1.539.638l3.963-3.96h11.27c.903 0 1.636-.733 1.636-1.637V5.592L18.408 0Zm3.955 5.592h12.816v8.59H8.455l-2.863 2.863Z"></path>
                </svg>
            } />
            <AppIcon href="https://contacts.google.com/" label="Contacts" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M4.625 22q-.4 0-.725-.325t-.325-.725v-2.625q0-2.25 1.4-3.975t3.6-2.2q-1 .7-1.55 1.762t-.55 2.288v4.75q0 .275.075.55t.25.5zM8.3 22q-.425 0-.737-.312t-.313-.738V16.2q0-1.75 1.238-2.975T11.475 12H16.2q1.75 0 2.975 1.225T20.4 16.2v1.6q0 1.75-1.225 2.975T16.2 22zM12 9.9q-1.65 0-2.8-1.15t-1.15-2.8 1.15-2.8T12 2t2.8 1.15 1.15 2.8-1.15 2.8T12 9.9"></path>
                </svg>
            } />
          </div>
        </div>
      )}
    </div>
  );
};

const AppIcon: React.FC<{ href: string; label: string; icon: React.ReactNode }> = ({ href, label, icon }) => (
  <a 
    href={href} 
    className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors group text-center"
  >
    <div className="text-gray-400 group-hover:text-white transition-colors w-10 h-10 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-medium truncate w-full">
      {label}
    </span>
  </a>
);

export default GoogleAppsMenu;
