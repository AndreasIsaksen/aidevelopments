import java.util.*;

class Trenode
{
    int verdi;
    Trenode venstre, høyre;
    int sum;
    Trenode forelder;
    
    public Trenode(int verdi, Trenode venstre, Trenode høyre)
    {
	this.verdi = verdi;
	this.venstre = venstre; this.høyre = høyre;
	sum = 0;
	forelder = null;
    }
}

public class Oblig_05
{
    // Oppgave 1
    static void settSum(Trenode rot)
    {
        // Deklarerer to variabler for å holde på verdier til
        // venste og høyre subtre
        int vV = 0, hV = 0;
        if (rot != null)
        {
            //Går rekursivt gjennom treet med 'Postorder'
            settSum(rot.venstre);
            settSum(rot.høyre);

            //Henter ut sum verdier fra noder i subtre
            // Bruker if-statement til å hente node verdi
            // Om node er null vil verdien bli satt til 0
            vV = (rot.venstre != null) ? rot.venstre.sum : 0;
            hV = (rot.høyre != null) ? rot.høyre.sum : 0;
            
            // summerer sum på subtrær med nodeverdi og legger de til i node sum
            rot.sum = rot.verdi + vV + hV;
        }
        
    }

    // Oppgave 2
    static void settForelder(Trenode rot)
    {
        //Bruker 'Preorder traversering' til å sette
        // forelder variabel til forelder klassen.
        if (rot != null)
        {
            //Går rekursivt til venstre
            if (rot.venstre != null)
            {
                rot.venstre.forelder = rot;
                settForelder(rot.venstre);
            }

            // Går rekursivt til høyre etter at venstre er ferdig
            if (rot.høyre != null)
            {
                rot.høyre.forelder = rot;
                settForelder(rot.høyre);
            }
        }
    }

    // Oppgave 3
    static void skrivUt(Trenode rot)
    {
        if (rot != null)
        {
            // Variabler som holder på verdier
            int v, s, f;
            // Unntaksvariabel for øvre rot
            char orphan = '*';
            // Lager kø for objekter
            Queue<Trenode> que = new LinkedList<Trenode>();
            que.add(rot);
            // Printer øvre linje
            System.out.println("Verdi\tSum\tForelder");
            // While loop kjører så lenge det er elementer i lista.
            while(!que.isEmpty())
            {
                // Tar ut et element fra køen
                Trenode thisTrenode = que.remove();
                // Om objekt ikke har forelder kjører denne
                if (thisTrenode.forelder == null)
                {
                    v = thisTrenode.verdi;
                    s = thisTrenode.sum;
                    System.out.printf("%d\t%d\t%c\n", v, s, orphan);
                    if ( thisTrenode.venstre != null)
                    que.add(thisTrenode.venstre);
                    if (thisTrenode.høyre != null)
                    que.add(thisTrenode.høyre);
                // Om objekt har forelder kjører denne
                }else
                {
                    v = thisTrenode.verdi;
                    s = thisTrenode.sum;
                    f = thisTrenode.forelder.verdi;
                    System.out.printf("%d\t%d\t%d\n", v, s, f);
                    if ( thisTrenode.venstre != null)
                        que.add(thisTrenode.venstre);
                    if (thisTrenode.høyre != null)
                        que.add(thisTrenode.høyre);
                }
            }
        }
    }

    // Testprogram
    public static void main(String args[])
    {
	Trenode rot =
            new Trenode(8,
                new Trenode(4,
                    new Trenode(2, null, null),
                    new Trenode(6, null, null)),
                new Trenode(16,
                    new Trenode(14,
                        new Trenode(12, null, null),
                        new Trenode(15, null, null)),
                    new Trenode(18, null,
                        new Trenode(20, null, null))));
	
	settSum(rot);
	settForelder(rot);
	skrivUt(rot);
    }
}