\NeedsTeXFormat{LaTeX2e}[1994/06/01]
\ProvidesClass{hiofthesis}[2020/08/28 Hiof Thesis by gunnar.misund@hiof.no]

%% Book options
\DeclareOption{11pt,a4paper,oneside}{
  \PassOptionsToClass{\CurrentOption}{book}
}


%% Custom package options

% Option master: Master version, default bachelor
\newif\ifmaster
\masterfalse
\DeclareOption{master}{
  \mastertrue
}

% Option sans: Uses HiØ official font "Source Sans Pro", default Latex standard Times Roman
\newif\ifsans
\sansfalse
\DeclareOption{sans}{
  \sanstrue
}

% Option us: Norwegian language, default american
\newif\ifus
\usfalse
\DeclareOption{us}{
  \ustrue
}

% Option word: The ugly M$ standard paragraph formatting, no indentation, one line separation, default: What is considered normal by the rest of the world.
\newif\ifword
\wordfalse
% Uses custom title page provided as "titlepage.pdf", OBS: MUST BE EXACTLY A4 SIZE

\DeclareOption{word}{
  \ClassWarning{hiofthesis}{Your thesis will now look like a standard formatted MicroSoft document, hmmm, up to you.}
  \wordtrue
}

% Option cover: Uses custom title page provided as "titlepage.pdf", OBS: MUST BE EXACTLY A4 SIZE, default HiØ standard thesis title page

\newif\ifcover
\coverfalse

\DeclareOption{cover}{
  \covertrue
}

% Fallback
\DeclareOption*{
  \ClassWarning{myclass}{Unknown option '\CurrentOption'}
}

% Execute default options
\ExecuteOptions{11pt,a4paper, oneside}

% Process given options
\ProcessOptions\relax

% Load base
\LoadClass[11pt,a4paper, oneside]{book}

% Load additional packages and commands.


\RequirePackage{fancyhdr,xcolor,paralist,lipsum,listings,geometry,pdfpages,url,nameref,xparse,subfigure,wrapfig,tabularx,amssymb,emptypage,relsize,xkeyval}
\RequirePackage[export]{adjustbox}

% Remove self reference in table of contents
%\ProvideDocumentCommand{\addchaptertocentry}{ m }{%
%	\addcontentsline{toc}{chapter}{#1}%
	

%\addchaptertocentry{\contentsname}\@starttoc{toc}}{}{}


\ifus
    \RequirePackage[american]{babel}
\else
    \renewcommand\lstlistingname{Kode}
    \renewcommand\lstlistlistingname{Kode}
    \RequirePackage[norsk]{babel}
\fi

% Implement options
%% Source sans pro font
\ifsans
    \RequirePackage[lining,light,default]{sourcesanspro}
    \RequirePackage[T1]{fontenc}
\fi

\ifcover
    \renewcommand{\maketitle}{
    \pagestyle{empty}
    \includepdf[pages=-]{titlepage.pdf}
    \pagestyle{headings}
        
    }
\else
    \ifmaster
        \ifus
            \def\doctype{Master's Thesis in Computer Science}
        \else
            \def\doctype{Masteroppgave i Informatikk}   
        \fi
    \else
        \ifus
            \def\doctype{Bachelor's Thesis in Computer Science} 
        \else
            \def\doctype{Arbeidskrav}      
        \fi
    \fi


    \renewcommand{\maketitle}{
    
        % Smaller margins on titlepage
        \newgeometry{top=7mm,bottom=15mm,inner=15mm,outer=15mm}
        \pagestyle{empty}
        \begin{titlepage}
            \includegraphics[width=0.5\textwidth,right]{img/hiof-logo.png}
            \hbox{
                \mbox{\hspace{10em}}
                \vtop{
                \vskip 3cm
                \begin{flushleft}
                    \textsf{\fontseries{t}\selectfont \bfseries \Huge \@title} \par
                \end{flushleft}
                \vskip 3cm
                \begin{flushleft}
                     \textsf{\LARGE \@author} \par
                \end{flushleft}
                \vskip 1cm
                \begin{flushleft}
                    \textsf{\large \@date\\ Halden} \par
                \end{flushleft}
            }%\hbox
        }
        
        \begin{figure}[!b]
        \includegraphics[width=1.0\textwidth]{img/hiof-footer.png}
        \end{figure}
        
        \null
        \end{titlepage}
        
        \pagestyle{headings}
        \newgeometry{inner=25mm,outer=35mm,top=30mm,bottom=40mm}
    }  

\fi %ifcover

%% Formatting paragraphs, must occur after maketitle
\ifword
  \setlength{\parindent}{0em}
  \setlength{\parskip}{1em}
\fi


%% Set main file
%!TEX root = main.tex


%%Common number levels in table of contents
\setcounter{tocdepth}{3}
\setcounter{secnumdepth}{3}

%%Various new commands

% Prevent orphan and widow lines
\widowpenalty10000
\clubpenalty10000
\brokenpenalty10000
\hyphenpenalty10000

% Set headings and footers

\cleardoublepage
\setcounter{page}{1}

\newcommand{\theend}{
\newpage
\pagestyle{empty}
\mbox{}
\newpage
\mbox{}
\newpage
\mbox{}
\cleardoublepage
}




\endinput