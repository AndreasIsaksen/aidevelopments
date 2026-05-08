import java.util.Queue;
import java.util.LinkedList;
import java.io.*;

public class OppgaveBC
{
    // Oppgave B
    public static void reparer(Node rot)
    {
		// Stopper om treet er tomt.
		if (rot == null) {
			return;
		}
		
		// lager en Node klasse som representerer gjeldende node.
		Node current = rot;
		
		// Kjører så lenge gjeldende Node har minst et barn.
		while (current.venstre != null || current.høyre != null) {
			Node minChild;
			
			// Finner barn med lavest verdi.
			if (current.venstre != null && current.høyre != null) {
				// Om det finnes to barn, så velges den minste.
				minChild = (current.venstre.verdi <= current.høyre.verdi) ? current.venstre : current.høyre;
			// Om det bare er et barn i venstre.
			} else if (current.venstre != null) {
				minChild = current.venstre;
			// Om det bare er et barn i høyre.
			} else {
				minChild = current.høyre;
			}
			
			//Sjekker om verdi for gjeldende node er mindre en barn
			// Stopper om barn verdi er større eller lik gjeldende node verdi.
			if (current.verdi <= minChild.verdi) {
				break;
			}
			
			// Bytter om på verdier om på noder, slik at forelder får den høyeste verdien.
			int temp = current.verdi;
			current.verdi = minChild.verdi;
			minChild.verdi = temp;
			
			// Bytter node til barn og repeterer prosessen.
			current = minChild;
		}
    }

    // Oppgave C
    public static void lagHeapOrdning(Node rot)
    {
		// Om treet er tomt, så gjør den ingenting.
		if (rot == null) {
			return;
		}
		
		// Først, rekursiv heap-order på venstre subtre.
		lagHeapOrdning(rot.venstre);
		
		// Så, rekursiv heap-order på høyre subtre.
		lagHeapOrdning(rot.høyre);
		
		// Kaller til slutt på reparer metode som gjør kontroll på verider i ny heap-order.
		reparer(rot);
    }

    // Nivå for nivå utskrift, for testing
    public static void print(Node rot)
    {
	if (rot == null)
		return;
	Queue<Node> q = new LinkedList<Node>();
	int n_nivå = 1, n_print = 0, n_neste = 0;
	q.add(rot);
	while (!q.isEmpty())
	{
		Node denne = q.remove();
		if (denne.venstre != null)
		{
		q.add(denne.venstre);
		n_neste++;
		}
		if (denne.høyre != null)
		{
		q.add(denne.høyre);
		n_neste++;
		}
		System.out.print(denne.verdi + " ");
		// Triks for å skrive ut hvert nivå på en egen linje
		if (++n_print == n_nivå)
		{
		System.out.println();
		n_print = 0;
		n_nivå = n_neste;
		n_neste = 0;
		}
	}
	if (n_print != 0)
		System.out.println();
	System.out.println();
    }
    
    // Testprogram
    public static void main(String argv[])
    {
	// Lager og og skriver ut treet i figur 3 i oppgaveteksten:
	Node rot = new Node(36,
						new Node(19,
							new Node(17,
								new Node(25, null, null),
								new Node(2, null, null)),
							new Node(7, null, null)),
						new Node(25,
							new Node(1, null, null),
							new Node(3, null, null)));
	print(rot);
	// Gjør om treet til et heap-ordnet tre og skriver ut
	lagHeapOrdning(rot);
	print(rot);
    }
}
