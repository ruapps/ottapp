const handlePrev = () => {

    setCurrentItem((prevEleState) => (
        {
          eleClass: " ", 
          currIndex : ( prevEleState.currIndex - 1 + props.Movies.length) % props.Movies.length,
          count: prevEleState.count > 0 ? prevEleState.count - 1 : 0
        }
        ));
    };

  const handleNext = () => {
    setCurrentItem((prevEleState) => (
      { 
        eleClass: "active", 
        currIndex: (prevEleState.currIndex + 1) % props.Movies.length, 
        count: prevEleState.count < 4 ? prevEleState.count + 1 : 4
      }
      ));
  
  };