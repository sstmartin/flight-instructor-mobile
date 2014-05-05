/*
 * init_screen(type)
 * Purpose:
 * Display the appropriate HTML divs for the given screen type.
 */
function init_screen(type){
    switch (type){
        case 'n':
            document.getElementById("n_footer").style.visibility="visible";
            document.getElementById("m_footer").style.visibility="hidden";
            document.getElementById("l_footer").style.visibility="hidden";
            
            document.getElementById("m_main").style.visibility="hidden";
            
            break;
        case 'm':
            document.getElementById("n_footer").style.visibility="hidden";
            document.getElementById("m_footer").style.visibility="visible";
            document.getElementById("l_footer").style.visibility="hidden";
            
            document.getElementById("m_main").style.visibility="visible";
            
            break;
        case 'l':
            document.getElementById("n_footer").style.visibility="hidden";
            document.getElementById("m_footer").style.visibility="hidden";
            document.getElementById("l_footer").style.visibility="visible";
            
            document.getElementById("m_main").style.visibility="hidden";
            
            break;
    }
}