import java.io.*;

public class OppgaveA
{
    // tell(): Returnerer antall forekomster av "verdi" i det
    // heap-ordnede treet med rot i "rot".
    public static int tell(Node rot, int verdi)
    {
      //Stopper når rekusjon er i bunn av en grein
      if (rot == null)
      return 0;
      
      //Stopper rekusjon på gren om verdi i parameter er høyere enn nodens verdi
      if (rot.verdi > verdi)
          return 0;

      //Når nodens verdi er lik verdi i parameter legger den på en og returnerer summeringen.
      int count = (rot.verdi == verdi) ? 1 : 0;
      return count + tell(rot.venstre, verdi) + tell(rot.høyre, verdi);
    }

    // main(): Testprogram
    public static void main(String argv[])
    {
	// Lager treet som er gitt i figur 1 i oppgaveteksten
	Node rot = new Node(1,
                      new Node(2,
                        new Node(17,
                          new Node(25, null, null),
                          new Node(19, null, null)),
                        null),
                      new Node(17, null,
                        new Node(36, null, null)));

	// Tester metoden tell() for noen verdier
	System.out.println("tell(2)  = " + tell(rot,2));
	System.out.println("tell(17) = " + tell(rot,17));
	System.out.println("tell(25) = " + tell(rot,25));
	System.out.println("tell(50) = " + tell(rot,50));
    }
}

